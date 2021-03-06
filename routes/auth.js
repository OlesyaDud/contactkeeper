// login, authentication, routes to check login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlewear/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route  GET api/auth
// @desc Get logged in user
// @access Private

router.get('/', auth, async (req, res) => {
  
  try {
    // user id but no password to get from db
    const user = await User.findById(req.user.id).select('-password'); 

    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// authenticating a user
// @route POST api/auth
// @desc AUTH USER AND GET TOKEN
// @access Public

router.post('/', [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password of 6 or more characters is required').exists(),
],

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});

    if(!user) {
      return res.status(400).json({msg: 'Invalid Credentials'});
    }

    const isUserMatch = await bcrypt.compare(password, user.password);

    if(!isUserMatch) {
      return res.status(400).json({msg: 'Invalid Credentials'})
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'),  {
      expiresIn: 36000
    }, (err, token)=>{
      if(err) throw err;
      res.json({token});
    });


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
