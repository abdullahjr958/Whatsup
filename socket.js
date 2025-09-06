const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const Room = require('./models/roomSchema.js');
const Message = require('./models/messageSchema.js');

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:3000', withCredentials: true },
  });
  
  // Socket.IO middleware to authenticate socket connections
  io.use((socket, next) => {
    const accessToken = socket.handshake.auth.accessToken;
    try {
      const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connect', (socket) => {
    console.log(`User Connected: ${socket.user.username}`);

    // Join rooms of the user
    Room.find({ members: socket.user.id }).then((rooms) => {
      rooms.forEach((room) => {
        socket.join(room._id.toString());
      });
    });

    // Listening for messages
    socket.on('sendMessage', async ({ roomId, content, senderId }) => {
      console.log(
        'FROM sendMessage. roomId:',
        roomId,
        'content:',
        content,
        'senderId:',
        senderId
      );
      const message = await new Message({
        room: roomId,
        sender: senderId, // sender is the id of the sender, not the whole user object
        content,
        sentAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }).save();

      // Populate sender username
      const populatedMessage = await message.populate('sender', 'username');
      const currentRoom = await Room.findByIdAndUpdate(roomId, {
        lastMessage: message._id,
      });

      // Create lastMessageSnippet
      let lastMessageSnippet = currentRoom.isGroup
        ? `${populatedMessage.sender.username}: ${
            content.length > 25 ? content.slice(0, 25) + '...' : content
          }`
        : `${content.length > 30 ? content.slice(0, 30) + '...' : content}`;

      // Update lastMessageSnippet in Room
      const room = await Room.findByIdAndUpdate(roomId, {
        $set: { lastMessageSnippet: lastMessageSnippet },
      }, { new: true }).lean();

      // Create message object to send
      const messageToSend = {
        _id: message._id,
        sender: { _id: populatedMessage.sender._id, username: populatedMessage.sender.username },
        content: message.content,
        sentAt: message.sentAt,
      };

      // Emit to all in the room except sender
      io.to(roomId).emit('receiveMessage', {
        message: messageToSend,
        room,
      });
    });

    socket.on('joinRoom', ({ roomId }) => {
      socket.join(roomId);
      console.log(`User ${socket.user.username} joined room: ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.username}`);
    });
  });
}