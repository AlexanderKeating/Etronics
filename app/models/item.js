/**This is the schema to PUT the items into the collections
 * in order to add them to our MongoDB databse
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var itemSchema = new mongoose.Schema({
        productName     : String,
        itemPrice       : Number,
        Quantity        : Number,
        Description     : String,
        seller          : String
        

});

module.exports = mongoose.model('item', itemSchema);