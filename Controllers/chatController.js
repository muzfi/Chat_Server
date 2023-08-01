const Message = require('../Models/messageModel');

const sendMessage = async (req, res) => {
  const { content, sender, recipient, group } = req.body;

  // Create a new message
  const newMessage = new Message({ content, sender, recipient, group });
  await newMessage.save();

  res.json({ message: 'Message sent successfully', message: newMessage });
};

const getHistory = async (req, res) => {
  const { userId, groupId } = req.body;

  // Retrieve chat history
  const messages = await Message.find({
    $or: [
      { group: groupId },
      { sender: userId },
      { recipient: userId },
    ],
  }).sort({ timestamp: -1 });

  res.json({ messages });
};

module.exports = {
  sendMessage,
  getHistory,
};
