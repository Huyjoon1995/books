var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
  title: String,
  authors: Array,
  pageCount: Number,
  thumbnail: String,
  owner: String,
  requestedBy: Array,
  isAvailable: Boolean,
  currentBorrower: String
});

var Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.saveBook = function(newBook, callback) {
  newBook.save(callback);
};

module.exports.getUserBooks = function(query, callback) {
  Book.find(query, callback);
};

module.exports.deleteBook = function(query, callback) {
  Book.findByIdAndRemove(query, callback);
};

module.exports.addRequest = function(id, update, callback) {
  Book.findByIdAndUpdate(id, update, callback);
};
