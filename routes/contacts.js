// CRUD
const express = require('express');
const router = express.Router();

// @route  GET api/contacts
// @desc Get all users contacts
// @access Private

router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// Add a contact/ POST / PRIVATE
router.post('/', (req, res) => {
  res.send('Add a contact');
});

//   Update a contact
// @route  PUT api/contacts/:id
// @desc UPDATE A CONTACT
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

//   Delete a contact
// @route  DELETE api/contacts/:id
// @desc Delete A CONTACT
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
