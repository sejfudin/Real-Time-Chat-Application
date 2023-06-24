const { Router } = require('express');
const { registerUser, loginUser, allUsers } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', loginUser);

module.exports = router;
