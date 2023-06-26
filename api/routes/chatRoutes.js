const { Router } = require('express');
const protect = require('../middleware/authMiddleware');
const {
  accessChat,
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
} = require('../controllers/chatControllers');

const router = Router();

router.route('/').post(protect, accessChat).get(protect, fetchChats);
router.post('/group', protect, createGroupChat);
router.put('/groupadd', protect, addToGroup);
router.put('/groupremove', protect, removeFromGroup);

module.exports = router;
