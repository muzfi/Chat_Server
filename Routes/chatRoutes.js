const express = require('express');
const router = express.Router();
const chatController = require('../Controllers/chatController');

router.post('/sendMessage', chatController.sendMessage);
router.get('/getHistory', chatController.getHistory);

module.exports = router;
