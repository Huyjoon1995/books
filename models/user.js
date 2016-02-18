var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: {type: String, required: true, bcrypt: true},
  fullName: String,
  city: String,
  state: String,
  favoriteQuote: String,
  messages: Array
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.updateUser = function(id, update, callback) {
  User.findByIdAndUpdate(id, update, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
     if (err) return callback(err);
     callback(null, isMatch);
  });
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
};

module.exports.createUser = function(newUser, callback) {
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) throw err;
        // set hashed password
        newUser.password = hash;
        // create user
        newUser.save(callback);
    });
};
