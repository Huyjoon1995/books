var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var books = require('google-books-search');
var Book = require('../models/book');

router.get('/mybooks', ensureAuthenticated, function(req, res, next) {
  res.render('mybooks');
});

router.post('/search', function(req, res, next) {
  books.search(req.body.title, function(err, data) {
    if (!err) {
      res.render('mybooks', {'results': data});
    } else {
      res.send('there was an error!!');
    }
  });
});

router.post('/addbook', function(req, res, next) {
  var newBook = new Book({
    title: req.body.title,
    authors: req.body.authors,
    pageCount: req.body.pageCount,
    thumbnail: req.body.thumbnail,
    owner: req.user.username,
    requestedBy: [],
    isAvailable: true
  });
  Book.saveBook(newBook, function(err, book) {
    if (err) throw err;
    req.flash('success', 'You have added a new book to your collection!');
    res.location('/books/mybooks');
    res.redirect('/books/mybooks');
  });
});

/* Passport function for access control. */
function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
 req.flash('info','Please sign in or register to view this page.');
 res.redirect('/users/register');
}

module.exports = router;
