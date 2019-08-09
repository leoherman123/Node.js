var mongoose = require('mongoose');

//user Schema
var usersSchema = mongoose.Schema({
  userId : Number,
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', usersSchema, 'User');
