var express = require('express');
var router = express.Router();

var Income = require('../models/Income');
var Expense = require('../models/Expense');

// income page
router.get('/income/new', (req, res, next) => {
    res.render('income');
});



// create income
router.post('/income/new', (req, res, next) => {
    if(req.session.passport){
         req.body.user = req.session.passport.user
    } else{
        req.body.user = req.session.userId;
    }
   Income.create(req.body, (err, createdIncome) => {
      if (err) return next(err);
      console.log('created income', createdIncome);
      res.redirect('/users');
    });
}); 


// fetch 
// router.get('/users/income:id',(req,res,next) => {
//     if(req.session.passport){
//         req.body.user = req.session.passport.user
//    } else{
//        req.body.user = req.session.userId;
//    }
//   Income.findById(req.body.user,(err,income) => {
//     console.log(income);
//     if(err) return next(err);
//     res.render('users', { income })
//   });
// });



// Expense page
router.get('/expense/new', (req, res, next) => {
    res.render('expense');
});

// router.post('/expense/new', (req, res, next) => {
//     if(req.session.passport){
//          req.body.user = req.session.passport.user
//     } else{
//         req.body.user = req.session.userId;
//     }
//    Expense.create(req.body, (err, createdExpense) => {
//       if (err) return next(err);
//       console.log('created expense', createdExpense);
//       res.redirect('/users');
//     });
// }); 

module.exports = router;
