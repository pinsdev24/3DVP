const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path')
var expressLayouts = require('express-ejs-layouts');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodejs-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(expressLayouts);


app.set('view engine', 'ejs');
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname, 'views'));

// Routes
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
