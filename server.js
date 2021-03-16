// entry point to backend
const express = require('express');
// initilize express into a var called app
const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to my App' }));

// Bringing routes here
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
