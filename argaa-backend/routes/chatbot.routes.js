const express = require('express');
const router = express.Router();
const { queryChatbot } = require('../controllers/chatbot.controller');

router.post('/query', queryChatbot);

module.exports = router;