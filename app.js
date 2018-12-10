require('./config/config');
require('./models/db');
require('./config/passportConfig');
const fs = require('fs');
const multer = require('multer');
const methodOverride = require('method-override');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
var nodemailer = require("nodemailer");
const request = require('request');
const path = require('path');
const exphbs = require('express-handlebars');
const rtsIndex = require('./routes/index.router');
var studentController = require('./controllers/student.controller.js');


const { mongoose } = require('./models/db.js');
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
// middleware

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use(passport.initialize());
app.use(cors({ origin: 'https://student-supervision.netlify.com/' }));
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');
// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.use('/student', studentController);

app.get('/failure', (req, res) => res.redirect('https://student-supervision.netlify.com/login'));
// start server
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started at port : ${process.env.PORT}`));