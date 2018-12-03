var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

var itemsSchema = new mongoose.Schema({
  productName     : String,
  itemPrice       : Number,
  Quantity        : Number,
  Description     : String,
  seller          : String
}, schemaOptions);

var items = mongoose.model('Items', itemsSchema);
module.exports = items;