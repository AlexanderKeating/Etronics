// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../app/models/users');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        email : 'email',
        firstName : 'firstName',
        lastName : 'lastName',
        dateOfBirth : 'birthdate',
        userName : 'userName',
        passwordField : 'password',
<<<<<<< HEAD
        firstName : 'firstName',
        lastName : 'lastName',
        userName : 'userName',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var userName = req.body.userName;
        
=======

    },
    function(email, password,firstName, userName,lastName, dateOfBirth, done) {

>>>>>>> f4bcbaca758e5152854a3657da745049569912c7
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
      
                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.firstName = firstName;
                newUser.local.lastName = lastName;
                newUser.local.userName = userName;
                newUser.local.dateOfBirth = dateOfBirth;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.firstName = firstName;
                newUser.local.lastName = lastName;
                newUser.local.userName = userName;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            

        });    

        });

    }));
<<<<<<< HEAD



// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else

        var userName = req.body.userName;

        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user )
            return done(null, false, req.flash('loginMessage', 'Username or password are incorrect.')); // req.flash is the way to set flashdata using connect-flash
        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Username or password are incorrect.')); // req.flash is the way to set flashdata using connect-flash


        // all is well, return successful user
        return done(null, user);
    });

}));

};


=======
};
>>>>>>> f4bcbaca758e5152854a3657da745049569912c7
