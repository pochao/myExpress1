var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { username:req.session.username, logined:req.session.logined } );
});

module.exports = router;
