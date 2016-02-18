var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var books = require('google-books-search');
var Book = require('../models/book');

router.get('/mybooks', ensureAuthenticated, function(req, res, next) {
  Book.getUserBooks({owner: req.user.username}, function(err, books) {
      res.render('mybooks', {'books': books});
  });
});

router.post('/mybooks', function(req, res, next) {
  books.search(req.body.title, function(err, data) {
    if (!err) {
      Book.getUserBooks({owner: req.user.username}, function(err, books) {
          res.render('mybooks', {'books': books, 'results': data});
      });
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
    isAvailable: true,
    currentBorrower: ''
  });
  Book.saveBook(newBook, function(err, book) {
    if (err) throw err;
    res.redirect('/books/mybooks');
  });
});

router.get('/delete/:id', function(req, res, next) {
  Book.deleteBook(req.params.id, function(err, doc) {
    if (err) throw err;
    console.log('Book was removed');
    res.redirect('/books/mybooks');
  });
});

router.get('/allbooks', function(req, res, next) {
  var query = {};
  if (req.user) { query = {owner: {$ne: req.user.username}}; }
  Book.getUserBooks(query, function(err, books) {
    if (err) throw err;
    res.render('allbooks', {books: books});
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
