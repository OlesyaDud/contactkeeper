// login, authentication, routes to check login
const express = require('express');
const router = express.Router();

// @route  GET api/auth
// @desc Get logged in user
// @access Private

router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// authenticating a user
// @route POST api/auth
// @desc AUTH USER AND GET TOKEN
// @access Public

router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;
