var express = require('express');
var router = express.Router();
var books = require('google-books-search');

/* GET users listing. */
router.get('/:book', function(req, res, next) {
  books.search(req.params.book, function(err, data) {
    if (!err) {
      res.send(JSON.stringify(data, null, 4));
    } else {
      res.send('there was an error!!');
    }
  });
});

module.exports = router;
