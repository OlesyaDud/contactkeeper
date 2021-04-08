const express = require('express');
const router = express.Router();
const auth = require('../middlewear/auth');
const { body, validationResult }=require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');


// @route  GET api/contacts
// @desc Get all users contacts
// @access Private (means protected route)

router.get('/', auth, async (req, res) => {
  try {
    // sorting by date, getting most recent contact
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    // returns
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a contact/ POST / PRIVATE
router.post('/', [auth, [
  body('name', 'Name is required')
  .not()
  .isEmpty()
], ], 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // which date do we want from the body
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name, email, phone, type, user: req.user.id
    });

// save contact to db
    const contact = await newContact.save();

    // return contact to the client
    res.json(contact);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//   Update a contact
// @route  PUT api/contacts/:id
// @desc UPDATE A CONTACT
// @access Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFileds = {};
  if (name) contactFileds.name = name;
  if (email) contactFileds.email = email ;
  if (phone) contactFileds.phone = phone;
  if (type) contactFileds.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({msg: 'Contact not found'});

    // making sure user owns contact
    // compares user to a token
    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized!'});
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      {$set: contactFileds}, 
      {new: true});

      res.json(contact);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//   Delete a contact
// @route  DELETE api/contacts/:id
// @desc Delete A CONTACT
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({msg: 'Contact not found'});

    // making sure user owns contact
    // compares user to a token
    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized!'});
    }

    await Contact.findByIdAndRemove(req.params.id);

      res.json({msg: 'Contact removed!'});
      
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
