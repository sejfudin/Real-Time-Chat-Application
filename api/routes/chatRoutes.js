const { Router } = require('express');
const protect = require('../middleware/authMiddleware');
const { accessChat } = require('../controllers/chatControllers');

const router = Router();

router.route('/').post(protect, accessChat);

module.exports = router;
