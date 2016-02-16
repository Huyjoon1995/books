var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
  title: String,
  authors: Array,
  pageCount: Number,
  thumbnail: String,
  owner: String,
  requestedBy: Array,
  isAvailable: Boolean
});

var Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.saveBook = function(newBook, callback) {
  newBook.save(callback);
};
