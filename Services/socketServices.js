const Message = require('../Models/messageModel');


const socketService = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", async (data) => {
      // Emit the message to the correct recipient or group
      socket.to(data.room).emit("receive_message", data);

      // Save the message in the database
      const newMessage = new Message({
        content: data.content,
        sender: data.sender,
        recipient: data.recipient,
        group: data.group,
      });
      await newMessage.save();
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
};

module.exports={socketService}
