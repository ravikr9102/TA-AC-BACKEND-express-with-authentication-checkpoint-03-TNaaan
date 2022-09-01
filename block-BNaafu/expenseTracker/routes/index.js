var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {''
  res.render('index', { title: 'Express' });
});

router.get('/success',(req,res) => {
  res.render('/users')
});

router.get('/failure', (req, res) => {
  res.render('/login');
});

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/users');
  }
);


module.exports = router;
