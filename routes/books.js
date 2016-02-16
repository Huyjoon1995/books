var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var books = require('google-books-search');

router.get('/mybooks', ensureAuthenticated, function(req, res, next) {
  res.render('mybooks');
});

router.post('/search', function(req, res, next) {
  books.search(req.body.title, function(err, data) {
    if (!err) {
      console.log(data);
      res.render('mybooks', {'results': data});
    } else {
      res.send('there was an error!!');
    }
  });
});

router.post('/addbook', function(req, res, next) {
  console.log(req.body.title + ' was clicked on the page!');
  res.render('mybooks');
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
