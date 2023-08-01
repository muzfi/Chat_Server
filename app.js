const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();
const connectDB = require('./Database/db');
const chatRoutes = require('./Routes/chatRoutes');
const {socketService} = require('./Services/socketServices');




const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Connect to the database
connectDB().then(() => {
  console.log('Database connection established');
}).catch((err) => {
  console.error('Database connection error:', err);
  process.exit(1);
});

// Use the socketService
socketService(io);

// Use the chat routes
app.use('/chat', chatRoutes);

server.listen(3001, () => {
  console.log('SERVER RUNNING');
});
