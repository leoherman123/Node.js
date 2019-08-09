//requiring the files itemList and user objects created
var userList = require('../models/User');
var userItems = require('../models/itemList');
var userProfile = require('../models/UserProfile');

//creating a array to store the users
//var users = [];
//var userProfiles = [];


//function to return the user and the userProfile
/*var returnUser = function(){
  users.push(user);
  console.log(users);
  return users;};
var returnUserProfile = function(){return userProfiles;};*/

module.exports.returnUsers= function(){
  console.log("called");
  var users = [];
  var user = userList.user('1','Buddy','Jobes','ninja@ninja.com');
  users.push(user);
  console.log(users);
  //return users;
};

//create a user
//var user = userList.user('1','Buddy','Jobes','ninja@ninja.com');
//var userItem1 = userItems.item[0];

//push the current user into the array
/*users.push(user);
userProfiles.push(new userProfile(user.userId));
userProfiles[0].addItem(userItem1);


module.exports.returnUser = returnUser;
module.exports.returnUserProfile = returnUserProfile;*/
