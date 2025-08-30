const express = require('express');
const { processChat } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router.post('/', processChat);

module.exports = router;