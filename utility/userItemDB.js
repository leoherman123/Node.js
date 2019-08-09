var mongoose = require('mongoose');
var itemDB = require('../utility/itemDB');
var userDB = require('../utility/userDB');
var usersItemSchema = require('../models/userItemsSchema');

//establish connection to database
mongoose.connect('mongodb://localhost/Assignment4DB');

var db = mongoose.connection;

//check for db error
db.on('error', console.error.bind(console, 'connection error:'));

//check for db connection
db.once('open', function callback() {
  console.log('connection established');
});


//gets all the items stored in a specific user database
var getUserItem = async function(userId)
{
  let userItems;
  try{
    userItems= await usersItemSchema.find({userId: userId});
    return userItems
  }catch(err){
    console.log(err);
  }
};

//function to add an item to database
var insertItem = async function(itemCode, userId)
{
  var item = await itemDB.getItem(itemCode);

  db.collection('UserItems').insert(item);
  db.collection('UserItems').updateOne({itemCode: itemCode}, {$set: {userId: userId}});
}

//function to delete and item off the database
var deleteItem = async function(itemCode)
{
  db.collection('UserItems').deleteOne({itemCode: itemCode});
}

//add item rating to the users items
var addItemRating = async function(itemCode, rating)
{
  db.collection('UserItems').updateOne({itemCode: itemCode},  {$set: {rating: rating}});
}

module.exports.addItemRating = addItemRating;
module.exports.deleteItem = deleteItem;
module.exports.insertItem = insertItem;
module.exports.getUserItem = getUserItem;
