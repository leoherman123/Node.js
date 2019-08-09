var mongoose = require('mongoose');

//users item schema
var itemsSchema = mongoose.Schema({
  itemCode: Number,
  itemName: String,
  catalogCategory: String,
  description: String,
  rating: Number,
  getImageURL: String,
  userId : Number
});

module.exports = mongoose.model('userItem', itemsSchema, 'UserItems');
