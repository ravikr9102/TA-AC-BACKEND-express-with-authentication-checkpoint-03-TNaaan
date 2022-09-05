var express = require('express');
var router = express.Router();

var User = require('../models/User');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user');
  // console.log(req.session);
});

// router.get('/all',async(req,res,next) => {
//   const allUser = await User.find()
//   console.log(allUser);
// });

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
  res.render('login');
});


// login handler
router.post('/login',(req,res,next) => {
  var { email, password} = req.body;
  if(!email || !password){
    res.redirect('/users/login')
  }
  User.findOne({ email }, (err,user) => {
    if(err) return next(err);
    if(!user){
     return res.redirect('/users/login')
    }
    // compare password
    user.verifyPassword(password,(err,result) => {
      console.log(err,result);
      if(err) return next(err);
      if(!result){
       return res.redirect('/users/login')
      }
      req.session.userId = user.id;
      res.redirect('/users')
    })
  });
});


router.get('/logout',(req,res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login')
});

module.exports = router;
