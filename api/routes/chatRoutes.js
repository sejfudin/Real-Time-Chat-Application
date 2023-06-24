const { Router } = require('express');
const protect = require('../middleware/authMiddleware');
const { accessChat, fetchChats, createGroupChat } = require('../controllers/chatControllers');

const router = Router();

router.route('/').post(protect, accessChat).get(protect, fetchChats);
router.post('/group', protect, createGroupChat);

module.exports = router;
