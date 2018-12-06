// app/routes.js
module.exports = function (app, passport) {
    var itemSchema = require('../app/models/item');
    var express = require('express');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    var itemsController = require('../datatableFunctions/getItemsController');
    var accountItemsController = require('../datatableFunctions/accountItems');


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
            message: req.flash('loginMessage'),
            user: req.user
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

    //Adding the items to MongoDB.
    app.post('/itemCreation', function (req, res) {
        var item = new itemSchema();
        item.productName  = req.body.productName;
        item.itemPrice    = req.body.itemPrice;
        item.Quantity     = req.body.Quantity;
        item.Description  = req.body.Description;
        item.seller       = req.user.local.userName;
        item.save(function (err) {
            if (err)
                throw err;
            else
                console.log('Saved item information successfully');
        });
        res.redirect('/shop');
    });
    app.get('items', function (req, res) {
    });





    //=========================================================================================
    //=========================================================================================
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/account', isLoggedIn, function (req, res) {
        res.render('account.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    //=========================================================================================
    //=========================================================================================
    // =====================================
    // My Items Page =====================
    // =====================================
    app.get('/myItems', isLoggedIn, function(req, res){
        res.render('myItems.ejs', {user: req.user}); 
    });
    app.get('/myItems', isLoggedIn, function (req, res) {
        res.sendFile(path.join(__dirname + '../views/myItems.ejs'));
    });

    
    app.post('/itemsToAccountTable',accountItemsController.getItemsAccount);

    //=========================================================================================
    //=========================================================================================
    // =====================================
    // Contact Page =====================
    // =====================================
    app.get('/contact', function (req, res) {
        res.render('contact.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    //=========================================================================================
    //=========================================================================================
    // =====================================
    // GET Item View Page ============================
    // =====================================

    app.get('/itemViewPage', function(req, res){
        res.render('itemViewPage.ejs');
    });

    //=========================================================================================
    //=========================================================================================
    // =====================================
    // GET SHOP ============================
    // =====================================
    app.get('/shop', function (req, res) {
        res.render('shop.ejs');
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

    //=========================================================================================
    //=========================================================================================
    // =====================================
    // Get Items from MongoDB for Datatables
    // =====================================

    app.get('/shop',function(req, res) {
        res.sendFile(path.join(__dirname + '../views/shop.ejs'));
    });
    app.post('/itemsToTable',itemsController.getItems);


   //=========================================================================================
    //=========================================================================================
    // =====================================
    // Get Items from MongoDB for Account Datatables
    // =====================================


};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}





 