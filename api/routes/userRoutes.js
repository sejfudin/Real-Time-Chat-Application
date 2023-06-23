const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = Router();

router.post('/', registerUser).post('/login', loginUser);

module.exports = router;
