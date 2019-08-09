var mongoose = require('mongoose');
var usersSchema = require('../models/userSchema');
//establish connection to database
mongoose.connect('mongodb://localhost/Assignment4DB');

var db = mongoose.connection;

//check for db error
db.on('error', console.error.bind(console, 'connection error:'));

//check for db connection
db.once('open', function callback() {
  console.log('connection established');
});

  //function to return all the user in mongoDB
  var getAllUsers = async function() {
      let users;
      try{
          users = await usersSchema.find();
          return users;
        }catch(err){
          console.log(err);
        }
  };

//useridis the pass in parameter for the userid
//function to return the user with the userid
var getUser = async function(userCode) {
    let user;
    try{
    user = await usersSchema.findOne({userId: userCode});
    return user;
  }catch(err){
    console.log(err);
  }
};

var getUserName = async function(userName, password) {
    let user;
    try{
    user = await usersSchema.findOne({email: userName, password: password});
    return user;
  }catch(err){
    console.log(err);
  }
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.getUserName = getUserName;
