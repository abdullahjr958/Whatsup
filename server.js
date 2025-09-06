const { createServer } = require('http');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('cookie-parser')());
require('dotenv').config();
require('./util/mongoose-connect.js');

app.use(require('./middleware/logger.js'));
app.use(require('./router/auth-router.js'));
app.use(require('./router/chat-router.js'));
app.use(require('./middleware/errorHandler.js'));

const httpServer = createServer(app);
require('./socket.js')(httpServer);

httpServer.listen(process.env.PORT, () =>
  console.log('------------- Server listening on Port 3000 -------------')
);

