var express = require('express');
var router = express.Router();
var books = require('google-books-search');

router.get('/mybooks', function(req, res, next) {
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

module.exports = router;
