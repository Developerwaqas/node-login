const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  res.render('index', {
    user: req.user
  });
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  if(req.user) {
    res.render('profile', {
      user: req.user
    });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
