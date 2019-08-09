var mongoose = require('mongoose');
var itemsSchema = require('../models/itemSchema'); //getting the item schema and model
mongoose.connect('mongodb://localhost/Assignment4DB');

var db = mongoose.connection;


//check for db error
db.on('error', console.error.bind(console, 'connection error:'));

//check for db connection
db.once('open', function callback() {
  console.log('connection established');
});

  //returning all the items in the database of Assignment4DB/Item
  var getAllItems = async function() {
      let items;
      try{
          items = await itemsSchema.find();
          console.log(items);
          return items;
        }catch(err){
          console.log(err);
        }
  };

//itemcode is the pass in parameter for the item code
//function to return the item with the item code
var getItem = async function(itemCode) {
    let item;
    try{
    item = await itemsSchema.findOne({itemCode: itemCode});
    console.log(item);
    return item;
  }catch(err){
    console.log(err);
  }
};

//get all the categories of the items in mongoDB 
var getCategories = async function(){
    let categories = [];
    let items = await getAllItems();
    if(items != undefined){
      for(i = 0; i < items.length; i++){
        let el = items[i].catalogCategory;
        if (!categories.includes(el)){
          categories.push(el);
        }
      }
  }
console.log(categories);
return categories;
};



//exporting the functions
module.exports.getAllItems = getAllItems;
module.exports.getItem = getItem;
module.exports.getCategories = getCategories;
