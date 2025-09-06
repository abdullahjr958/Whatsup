const express = require('express');
const router = express.Router();

const authAccessToken = require('../middleware/auth-access-token');
const User = require('../models/userSchema');
const Room = require('../models/roomSchema');
const Message = require('../models/messageSchema');
const jwt = require('jsonwebtoken');

// To get the chat page
// This API only returns the chat page.
// In chat.html, a fetch request will be made to get the chat data from /rooms endpoint.
router.get('/chat', async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.redirect('/login');
    if(!accessToken) {
      const isRefreshVerified = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if(!isRefreshVerified) return res.redirect('/login');
      const newAccessToken = jwt.sign({ id: isRefreshVerified.id, username: isRefreshVerified.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
      res.cookie('accessToken', newAccessToken, { httpOnly: true, sameSite: 'strict' }).sendFile(process.cwd() + '/public/chat.html');
    }
    else{
      const isAccessVerified = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if(isAccessVerified) return res.status(200).sendFile(process.cwd() + '/public/chat.html');

      const isRefreshVerified = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if(!isRefreshVerified) return res.redirect('/login');
      const newAccessToken = jwt.sign({ id: isRefreshVerified.id, username: isRefreshVerified.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

    return res
      .status(200)
      .cookie('accessToken', newAccessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      })
      .sendFile(process.cwd() + '/public/chat.html');
  }
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// This API returns all chat rooms for the authenticated user.
// This will be called automatically when the user opens the chat page.
router.get('/rooms', authAccessToken, async (req, res) => {
  try {
    const user = req.user;
    const rooms = await Room.find({ members: user.id })
      .populate('members', 'username email')
      .sort({ updatedAt: -1 })
      .lean();
    if (!rooms) return res.status(404).json({ message: 'No rooms found' });

    for (const room of rooms) {
      if (!room.isGroup) {
        const roomName = room.roomName;
        if (user.username == roomName.split('&')[0]) {
          room.roomName = roomName.split('&')[1];
          room.initials = roomName.split('&')[1].charAt(0).toUpperCase();
        } else {
          room.roomName = roomName.split('&')[0];
          room.initials = roomName.split('&')[0].charAt(0).toUpperCase();
        }

        const lastMessage = await Message.findOne({ room: room._id })
          .sort({ createdAt: -1 })
          .populate('sender', 'username')
          .lean();
        if (lastMessage) {
          if (lastMessage.content.length > 30) {
            room.lastMessageSnippet =
              lastMessage.content.substring(0, 30) + '...';
          } else {
            room.lastMessageSnippet = lastMessage.content;
          }
        } else room.lastMessageSnippet = '';
      } else {
        const lastMessage = await Message.findOne({ room: room._id })
          .sort({ createdAt: -1 })
          .populate('sender', 'username')
          .lean();
          room.initials = room.roomName.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
        if(lastMessage){
          if (lastMessage.content.length > 30) {
            room.lastMessageSnippet =
              `${lastMessage.sender.username}: ` +
              lastMessage.content.substring(0, 30) +
              '...';
          } else {
            room.lastMessageSnippet =
              ` ${lastMessage.sender.username}: ` + lastMessage.content;
          }
        }
        else room.lastMessageSnippet = '';
      }
    }

    // Including Access token because it is the first response that is automatically sent when the user visits chat page.
    // The client will store this in a variable and send it with each subsequent requests.
    return res
      .status(200)
      .json({ accessToken: req.cookies.accessToken, userId: req.user.id, yourUsername: req.user.username, yourInitials: req.user.username.split(' ').map(name => name.charAt(0)).join('').toUpperCase(), rooms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// When the user clicks on a room, this API will return all messages in that room.
router.get('/messages', authAccessToken, async (req, res) => {
  try {
    const { username } = req.user;
    const room = await Room.findById(req.query.roomId).lean();
    const messages = await Message.find({ room: room._id })
      .sort({ createdAt: 1 })
      .populate('sender', 'username')
      .lean();
      messages.forEach(message => {
        message.isOwn = message.sender.username === username;
      });
    if (!messages)
      return res.status(404).json({ message: 'No messages found' });

    messages.forEach((message) => {
      message.isOwn = message.sender.username === username;
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/room', authAccessToken, async(req, res) => {
  try{
    const roomId = req.query.roomId;
  const room = await Room.findById(roomId).populate('admin', '_id username').populate('members', '_id').lean();
  if(!room) return res.status(404).json({ message: 'Room not found' });
  if(!room.isGroup){
    room.roomName = room.roomName.split('&').filter(n => n != req.user.username)[0];
    room.initials = room.roomName.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
  }
  res.status(200).json({ room });
  }
  catch(err){
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// User will click on "Create Group" and provide a name and fellow members.
// He will send this info to this endpoint and a room will be created.
// The newly created room will be returned in the response and user will display it in the contact list.
router.post('/room', authAccessToken, async (req, res) => {
  try {
    const { name, members } = req.body;
    if (!name || members.length === 0) {
      return res
        .status(400)
        .json({ message: 'Room name and members are required' });
    }

    const room = new Room({
      roomName: name,
      members,
      initials: name.split(' ').map((n) => n.charAt(0)).join('').toUpperCase(),
      admin: req.user.id,
    });

    await room.save();

    const populatedRoom = await Room.findById(room._id)
      .populate('members', 'username')
      .lean();

    return res.status(201).json(populatedRoom);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// In the chat page, user will search for a contact with a username
// This api will search for the user in the database and send back the searched user. User is not added yet.
router.get('/user', authAccessToken, async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.query.username })
      .select('-password')
      .lean();
    if (!foundUser) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json(foundUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// To create a room with a user. Like a one-on-one chat
router.post('/add-user', authAccessToken, async (req, res) => {
  try {
    const currentUser = await User.findOne({
      username: req.user.username,
    }).lean();
    const userToAdd = await User.findOne({
      username: req.body.username,
    }).lean();

    // Create a new Room with the current user and the user to add
    const newRoom = await new Room({
      members: [currentUser._id, userToAdd._id],
      roomName: `${currentUser.username}&${userToAdd.username}`,
      initials: `${currentUser.username.charAt(0)}&${userToAdd.username.charAt(
        0
      )}`.toUpperCase(),
      isGroup: false,
      lastMessageSnippet: '',
      admin: currentUser._id,
    }).save();

    // Adjust roomName and initials for response
    newRoom.roomName = newRoom.roomName.split('&').filter(n => n != req.user.username)[0];
    newRoom.initials = newRoom.roomName.charAt(0).toUpperCase();
    res.status(201).json({ newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/search', authAccessToken, async(req, res) => {
  try{
    if(req.user.username === req.query.username) return res.status(400).json({ message: 'You cannot search for yourself' });
    const searchedUser = await User.findOne({ username: req.query.username }).select('-password').lean();
    if(!searchedUser) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ searchedUser });
  }
  catch(err){
    console.log(err);
    return res.status(404).json({ message: 'User not found' });
  }
});

router.post('/create-group', authAccessToken, async(req, res) => {
  try{
    const { groupName, users } = req.body;
    if(!groupName || users.length === 0){
      return res.status(400).json({ message: 'Group name and members are required' });
    }
    if(!Array.isArray(users)) {
      users = [users];
    }
    for (let i = 0; i < users.length; i++) {
      const username = users[i];
      const user = await User.findOne({ username }).lean();
      if (!user) break;
      users[i] = user._id;
    }
    users.push(req.user.id); // Adding the creator to the group
    const newRoom = await new Room({
      roomName: groupName,
      members: users,
      isGroup: true,
      admin: req.user.id,
      initials: groupName.split(' ').map(n => n.charAt(0)).join('').toUpperCase(),
    }).save();
    return res.status(201).json({ newRoom });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

// Add last message snippets to individual chats
// add new members in an existing group