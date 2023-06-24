const { Router } = require('express');
const protect = require('../middleware/authMiddleware');
const {
  accessChat,
  fetchChats,
  createGroupChat,
  addToGroup,
} = require('../controllers/chatControllers');

const router = Router();

router.route('/').post(protect, accessChat).get(protect, fetchChats);
router.post('/group', protect, createGroupChat);
router.put('/groupadd', protect, addToGroup);

module.exports = router;
