const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// ==============
//  BODY PARSER
// ==============

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ==============
//   DATABASE
// ==============

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ==============
//  PASSPORT
// ==============

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// ==============
//    ROUTES
// ==============

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// ==============
//    SERVER
// ==============

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
