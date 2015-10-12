var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();


/* GET welcome page. */
router.get('/', function(req, res) {
	var email = 'guest';
	if(req.user && req.user.email){
		email = req.user.email;
	}
  	res.render('index', {user: email, title: 'Express'});
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  Account.register(new Account({email: req.body.email}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local', function(req, res, next){
  var result = {message: 'fail', email: ''};
  if(res){
      result.message = 'success';
      result.email = res.email;
  }
  return result;
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
