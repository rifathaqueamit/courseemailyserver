// imports
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;

// app flow
require('./models/User');             // inform mongo about users collection
mongoose.connect(keys.mongoURI);      // connect database
const app = express();   // create express

//  setup express (cookie-session)
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //  - 30 days
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');     // setup passport
authRoutes(app);                    // setup routes
app.listen(PORT);                   // start server