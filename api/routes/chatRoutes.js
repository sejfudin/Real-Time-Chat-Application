const { Router } = require('express');
const protect = require('../middleware/authMiddleware');
const { accessChat, fetchChats } = require('../controllers/chatControllers');

const router = Router();

router.route('/').post(protect, accessChat).get(protect, fetchChats);

module.exports = router;
