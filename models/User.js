var user = function(userId, first, last, email) {
  var userModel =
  {
  userId : userId,
  firstName : first,
  lastName : last,
  email : email
};
  return userModel;
}


module.exports.user = user;
