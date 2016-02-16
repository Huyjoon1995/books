var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
  title: String,
  authors: Array,
  pageCount: Number,
  thumbnail: String
});

var Book = module.exports = mongoose.model('Book', BookSchema);
