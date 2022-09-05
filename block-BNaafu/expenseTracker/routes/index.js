var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success',(req,res) => {
  res.render('/users')
});

router.get('/failure', (req, res) => {
  res.render('/login');
});


// github
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/users');
  }
);

// google
router.get(
  '/auth/google',
  passport.authenticate('google',   { scope: ['email', 'profile']})
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/login'}),
  (req, res) => {
    res.redirect('/users');
  }
);

module.exports = router;
