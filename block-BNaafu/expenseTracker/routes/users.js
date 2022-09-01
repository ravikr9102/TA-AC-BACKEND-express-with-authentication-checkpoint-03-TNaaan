var express = require('express');
var router = express.Router();

var User = require('../models/User');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(req.session);
});

// render a form to  register the user
router.get('/register', (req, res, next) => {
  res.render('registerUser');
});

//save the user data in the database register the user
router.post('/register',(req,res,next) => {
  User.create(req.body,(err,user) => {
    if(err) return next(err);
    res.redirect('/users/login')
  });
});

// login form 
router.get('/login', (req, res, next) => {
  // var error = req.flash('error')[0];
  // console.log(error)
  res.render('login');
});

// login handler
router.post('/login',(req,res,next) => {
  var { email, password} = req.body;
  if(!email || !password){
    // req.flash('error','Email/password required')
    res.redirect('/users/login')
  }
  User.findOne({ email }, (err,user) => {
    if(err) return next(err);
    if(!user){
     return res.redirect('/users/login')
    }
    // compare password
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err);
      if(!result){
       return res.redirect('/users/login')
      }
      req.session.userId = user.id;
      res.redirect('/users')
    })
  })
})

module.exports = router;
