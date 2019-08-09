var express = require('express');
var router = express.Router();
var session = require('express-session')
var userList = require('../models/User');
var userProfile = require('../models/userList');
var userItems = require('../models/itemList');
var itemDB = require('../utility/itemDB');
var userDB = require('../utility/userDB');
var userItemDB = require('../utility/userItemDB');
const { check, validationResult } = require('express-validator/check');


let error;
//router to get the sign in
router.get('/signIn',
[
  check('username').isEmail(),
  check('password').isAlphanumeric()

],async function(req, res){
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
    }

  //checking to see if the session is created
  if(req.session.username && req.session.password) {
    res.redirect('/myItems');
  }
  //if a session is not created render to the sign in page
  else {
    console.log('this is occuring');
    res.render('signIn.ejs',  { errors: error});
  }
});

//after entering a username the login to the user session created
router.post('/signIn',[
      check('username').isEmail().withMessage('this is not an email'),
      check('password').isAlphanumeric().withMessage('this password needs to be Alphanumeric'),
      check('userId').isNumeric()
    ],
async (req,res) => {

  const errors = validationResult(req);
 if (!errors.isEmpty()) {
   error = errors.array();
 }


    req.session.username = req.body.username;
    req.session.password = req.body.password;
    // var userName = req.body.username;
    // var passWord = req.body.password;

    // var allEmails = [];
    // var allPasswords = [];
    // var getAlluser =  await userDB.getAllUsers()
    // for(var i = 0 ; i < getAlluser.length; i++)
    // {
    //   var emails = getAlluser[i];
    //   allEmails.push(emails.email);
    //   allPasswords.push(emails.password);
    // }
    // var bool;



    // if(req.session.username && req.session.password)
    // {
    //   for(var i = 0; i < allEmails.length; i++)
    //   {
    //     if(req.session.username == allEmails[i] && req.session.password ==allPasswords[i])
    //     {

          //console.log('email found a match');
          var userName = req.session.username;
          var passWord = req.session.password;
        //   bool = true;
        //   break;
        // }
        // else
        // {
        //   bool = false;
        //   req.session.destroy(function(err)
        //   {
        //     //checking for errors
        //     if (err)
        //     {
        //       res.negotiate(err);
        //     }
        //     console.log("has logged out");
        //     res.redirect('/signIn');
        //   });
        // }



    // if(bool == true){
    var demoItem = await itemDB.getItem(0);
    req.session.theUser =  await userDB.getUserName(userName, passWord);
    console.log(req.session.theUser);
    if(req.session.theUser == "null")
    {
      res.redirect('/signIn');
    }
    else {

    // req.locals.data = req.session.theUser;
    if(req.session.theUser.userId != "null"){
    console.log("This is currently stored in the local data" + req.session.theUser.userId);

    req.session.userItem = [demoItem];
    var userItem = await userItemDB.getUserItem(req.session.theUser.userId);
    for(var i = 0; i < userItem.length; i++)
    {
      var element = userItem[i];
      req.session.userItem.push(element);
    }
    console.log(req.session.userItem);
    res.redirect ('/myItems');
    res.end('end');
  }
  //}

}});

//router to create a logout page

router.get('/logout', function(req,res){
  //destroying the session if the user press logout
  req.session.destroy(function(err)
  {
    //checking for errors
    if (err)
    {
      res.negotiate(err);
    }
    console.log("has logged out");
    res.redirect('/');
  });
});

//router to delete a item off the list of the user session
router.get('/delete', [
  check('itemCode').isNumeric().withMessage('this has to be a number')
],function(req,res){
  //creating a for loop to loop through the userItem session array
  for(var t = 0; t <= req.session.userItem.length; t++)
    {
      //if the user item code is = the query user selected item code
      if(Number(req.session.userItem[t].itemCode) === Number(req.query.itemCode))
      {
        //match up the itemCode of the Item call the function deleteItem
        userItemDB.deleteItem(Number(req.query.itemCode));
        //splice the item from the list
        req.session.userItem.splice(t, 1);
        break;
      };
    };
    //render myItems page
    res.render('myItems',  {title: 'My Items', check: '1', user: req.session.theUser, userItems: req.session.userItem});
});

//router to add the item on to the userItem list session
router.get('/add', [
  check('itemCode').isNumeric().withMessage('itemcode has to be a number'),
  check('username').isEmail().withMessage('this has to be a email')
],function(req,res){

  if(!req.session.username)
  {
    res.redirect('signIn');
  }
  //if the session get the index return the itemCode
  if(req.session.userItem.findIndex(function (ele){return ele.itemCode === req.query.itemCode}) === -1)
  {

    console.log(req.session.userItem);
    //create a variable to hold the function
    var index = userItems.item.findIndex(function (ele) {
        //if the itemCode is = to the selected itemCode add the item to the list
        if (Number(ele.itemCode) === Number(req.query.itemCode)) {

          /*
          match up the itemCode of the Item call the function insertItem
          and insert the item to the database when save it is pressed on
          */
          userItemDB.insertItem(ele.itemCode, req.session.theUser.userId);

            return ele;
        }
      });
      //pushing the item selected into the list

    req.session.userItem.push(userItems.item[index]);
    console.log("This item is being added to the list" + userItems.item[index]);
    console.log("----------------------------------------------------------------------------------");
    console.log(req.session.userItem);

    //render the myItems page after
    res.render('myItems',  {title: 'My Items', check: '1', user: req.session.theUser, userItems: req.session.userItem});
  }
  else
  {
      res.redirect('/feedback?itemCode=' + req.query.itemCode)
  };
});


module.exports = router;
