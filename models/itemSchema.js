var mongoose = require('mongoose');

//item schema
var itemsSchema = mongoose.Schema({
  itemCode: Number,
  itemName: String,
  catalogCategory: String,
  description: String,
  rating: Number,
  getImageURL: String
});

module.exports = mongoose.model('Item', itemsSchema, 'Item');
