// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var itemSchema = mongoose.Schema({

    local            : {
        productName     : String,
        itemPrice       : Number,
        Quantity        : Number,
        Description     : String,
        seller          : String
        }

});


// create the model for users and expose it to our app
module.exports = mongoose.model('item', itemSchema);