var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();


/* GET welcome page. */
router.get('/', function(req, res) {
  var email = 'guest';
  if (req.user && req.user.email) {
    email = req.user.email;
  }
  res.render('index', {
    user: email,
    title: '旅橙'
  });
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  var email = req.body.email;
  console.log('registering user: ' + email);

  Account.register(new Account({
    email: req.body.email
  }), req.body.password, function(err, account) {
    if (err) {
      console.log('error while user register!', err);
      return res.render('register', {});
    }

    passport.authenticate('local')(req, res, function() {
      console.log('user registered!');
      res.send({
        message: 'success',
        account: {
          _id: account._id,
          email: account.email,
          role: account.role
        }
      });
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, account) {
    if (err) {
      return next(err);
    } else if (!res) {
      res.send({
        message: "fail"
      });
    } else {
      res.send({
        message: "success",
        account: {
          _id: account._id,
          email: account.email,
          role: account.role
        }
      });
    }
  })(req, res, next);
});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;