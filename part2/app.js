const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// session middleware
// sets up cookie based session, so we can remember who is logged in
app.use(session({
    name: 'dogwalk.sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie : { maxAge: 1000 * 60 * 60}
}))
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
