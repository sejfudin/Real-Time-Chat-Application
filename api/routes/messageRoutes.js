const { Router } = require('express');
const protect = require('../middleware/authMiddleware');
const { sendMessage, allMessages } = require('../controllers/messageControllers');
const rateLimiter = require('../middleware/rateLimiter');
const extractUserId = require('../middleware/extractSenderId');

const router = Router();

router.route('/').post(protect, extractUserId, rateLimiter, sendMessage);
router.get('/:chatId', protect, allMessages);

module.exports = router;
