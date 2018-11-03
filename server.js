var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect('mongodb+srv://etronicsAdmin:test@e-tronics-k3fco.mongodb.net/test?retryWrites=true', {useNewUrlParser: true}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

<<<<<<< HEAD
app.use('/css', express.static(__dirname + "/CSS"));
app.use('/Images', express.static(__dirname + "/Images"));
=======


app.use('/css', express.static(__dirname + "/CSS"));
app.use('/Images', express.static(__dirname + "/Images"));

>>>>>>> f4bcbaca758e5152854a3657da745049569912c7
// routes ======================================================================
require('./app/route.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
