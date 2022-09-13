const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/',  authController.isLoggedIn);
router.get('/profile',  authController.isLoggedIn);
router.get('/logout', authController.logout);


module.exports = router;