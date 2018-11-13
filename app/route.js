// app/routes.js
module.exports = function (app, passport) {
    var itemSchema = require('../app/models/item');


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    //=========================================================================================
    //=========================================================================================

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/account', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    //=========================================================================================
    //=========================================================================================
    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('index.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/account', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    //=========================================================================================
    //=========================================================================================
    //======================================
    //Item Creation ========================
    //======================================
    app.get('/itemCreation', function (req, res) {
        res.render('itemCreation.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });
    app.post('/itemCreation', function (req, res) {
        var item = new itemSchema();
        item.local.productName  = req.body.productName;
        item.local.itemPrice    = req.body.itemPrice;
        item.local.Quantity     = req.body.Quantity;
        item.local.Description  = req.body.Description;
        item.local.seller       = req.user.local.userName;
        item.save(function (err) {
            if (err)
                throw err;
            else
                console.log('Saved item information successfully');

        });
        res.redirect('/shop');
    });



    //=========================================================================================
    //=========================================================================================
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/account', function (req, res) {
        res.render('account.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/contact', function (req, res) {
        res.render('contact.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/shop', function (req, res) {
        res.render('shop.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });


    //=========================================================================================
    //=========================================================================================
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}