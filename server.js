var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');



var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect('mongodb+srv://etronicsAdmin:test@e-tronics-k3fco.mongodb.net/Etronics?retryWrites=true', {
    useNewUrlParser: true
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


mongoose.set('debug', true)

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies
app.use(bodyParser()); // get information

//Used for pulling information from MongoDB
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //Set up

// required for passport
app.use(session({
    secret: 'secretEtronics'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/css', express.static(__dirname + "/CSS"));
app.use('/Images', express.static(__dirname + "/Images"));
app.use('/app', express.static(__dirname + "/app"));

// routes ======================================================================
require('./app/route.js')(app, passport); // load our routes and pass in our app and fully configured passport

// Go live ======================================================================
app.listen(port); //Make the website available on all IPS and the port is 8080.
console.log('Port' + port);