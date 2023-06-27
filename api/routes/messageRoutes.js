const { Router } = require('express');
const protect = require('../middleware/authMiddleware');
const { sendMessage, allMessages } = require('../controllers/messageCOntrollers');

const router = Router();

router.route('/').post(protect, sendMessage);
router.get('/:chatId', protect, allMessages);

module.exports = router;
