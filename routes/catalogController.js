//declaring the variable to require express
var express = require('express');
var router = express.Router();
var userList = require('../models/User');
var itemDB = require('../utility/itemDB');
var userDB = require('../utility/userDB');
var userItemDB = require('../utility/userItemDB');
const { check, validationResult } = require('express-validator/check');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Assignment4DB');

var db = mongoose.connection;

//check for db error
db.on('error', console.error.bind(console, 'connection error:'));

//check for db connection
db.once('open', function callback() {
  console.log('connection established');
});


var mongoose = require('mongoose');
var bodyParser = require('body-parser');
let errors;

//creating a route to the index/homepage
router.get('/', function(req, res, next){
console.log('index page');
    var page = {
      title: 'Home',
      path: req.url
    }
    res.render('index', {title: page, });
});

router.get('/register', function(req,res,next){
  console.log('register');
    var page = {
      title: 'register',
      path: req.url
    }
    res.render('register', {title: page});
});

router.post('/register', async function(req,res,next){
  var numberUser = await userDB.getAllUsers();

  db.collection('User').insert({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, userId: numberUser.length + 1 });
  res.redirect('/signIn');
})


//creating a route to the categories page
router.get('/Categories', async function(req, res, next){
  var getItems = await itemDB.getAllItems();
  var getCategories = await itemDB.getCategories();
  console.log('the categories is pressed');
  console.log(getItems);
  console.log("Categories-"+getCategories);
  var data = {
    title: 'Categories',
    path: req.url,
    categories: getCategories,
    items: getItems
  }
  res.render('Categories',{data: data });
});

router.get('/Categories/:categoryName',[
  check('categoryName').isAlpha().withMessage('this has to be alphabet')
] ,async function (req,res) {

  const errors = validationResult(req);
 if (!errors.isEmpty()) {
   error = errors.array();
 }

    // get the category name
    var categories = [];
    categories.push(req.params.categoryName);
    var itemData = await itemDB.getAllItem();
    var data = {
        title:'Categories',
        path: req.url,
        categories: categories,
        items: itemData
    }
    res.render('Categories', { data: data});
});

router.get('/Categories/item/:itemCode', [
  check('itemCode').isNumeric().withMessage('this has to be a number')
],async function(req, res, next){
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
   error = errors.array();
 }

  var itemCode = req.params.itemCode;
  console.log("Item Code: " + itemCode);

  var item = await itemDB.getItem(itemCode);
  console.log(item);
  var data = {
    title: 'Item',
    path: req.url,
    item: item
  }
  res.render('item', {data: data});
});




//creating a route to the contact page
router.get('/Contact',async function(req, res, next){
  var page= {
    title: 'Contact Us',
    path: req.url
  }
  res.render('Contact', {title: page});
});

//creating a route to the about page
router.get('/About', async function(req, res, next){

    var page = {
      title: 'About Us',
      path: req.url
    }
    res.render('About', {title: page});
});

//creating a route to the feedback page
router.get('/feedback/:itemCode',[
  check('itemCode').isNumeric().withMessage('this has to be a number ')
] ,async function(req , res, next){
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
   error = errors.array();
 }

    var feedCode = req.params.itemCode;
    console.log(feedCode);
    var item = await itemDB.getItem(feedCode);
   var page = {
     title: "Feedback",
     path: req.url,
     item:item
   }
   res.render('feedback', {data: page});
 });

//post created to the feed back page
 router.post('/feedback/:itemCode',[
   check('itemCode').isNumeric().withMessage('this has to be a number'),
   check('feedCode').isNumeric().withMessage('this has to be a number')

 ] ,async function(req , res){
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    error = errors.array();
  }

  var feedCode = req.params.itemCode;
    console.log(feedCode);
    var item = await itemDB.getItem(feedCode);
   var page = {
     title: "Feedback",
     path: req.url,
     item:item
   }

  var index = req.session.userItem.findIndex(function (ele) {
    if (Number(ele.itemCode) === Number(req.params.itemCode)) {
      userItemDB.addItemRating(Number(ele.itemCode),req.body.rate);
        return ele;
    }


  });
  req.session.userItem[index].rating = req.body.rate;

  var itemCode = req.params.itemCode;
  console.log("Item Code: " + itemCode);

  var item = await itemDB.getItem(itemCode);
  console.log(item);
  var data = {
    title: 'Item',
    path: req.url,
    item: item
  }
  res.render('item', {data: data});
});

//creating a route to the myItems page
router.get('/myItems',[
  check('username').isEmail().withMessage('this has to be a email'),
  check('password').isAlphanumeric().withMessage('this has to be a Alphanumeric value')
] ,function(req, res){

  if(!req.session.username && !req.session.password)
  {
      res.render('myItems',  {title: 'My Items', check: '0 ', user: req.session.theUser, userItems: req.session.userItem});
  }
  else
  {
    //testing the session user items
    console.log(req.session.userItem);
    console.log('');
    console.log('this is the user passed in');
    console.log(req.session.theUser);
    res.render('myItems',  {title: 'My Items', check: '1', user: req.session.theUser, userItems: req.session.userItem});

  }
});

//exporting the module
module.exports = router;
