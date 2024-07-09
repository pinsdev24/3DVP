const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodejs-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// View Engine
app.set('view engine', 'ejs');

// Routes
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
