// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();
// const { validate } = require('./models/ValidateUser');


// // Register Form POST
// router.post('/createAccount', (req, res) => {
//     const userVal_Data = {
//                 username: req.body.UserName,
//                 password: req.body.Password,
//                 birthDay: req.body.BOD_Day,
//                 birthMonth: req.body.BOD_Month,
//                 birthYear: req.body.BOD_Year,
//                 email: req.body.EmailAddress,
//                 firstName: req.body.FirstName,
//                 lastName: req.body.LastName,
//                 //PhoneNumber: req.body.PhoneNumber
//             }
//             const { error } = validate(userVal_Data);
//             if (error) {
//                 res.render('signup', {
//                     error: error.details[0].message,
//                     UserName: req.body.UserName,
//                     BOD_Day: req.body.BOD_Day,
//                     BOD_Month: req.body.BOD_Month,
//                     BOD_Year: req.body.BOD_Year,
//                     EmailAddress: req.body.EmailAddress,
//                     FirstName: req.body.FirstName,
//                     LastName: req.body.LastName,
//                     PhoneNumber: req.body.PhoneNumber
//                 })
//             } else {
//                 if (req.body.Password != req.body.PasswordConfirm) {
//                     let error = 'Password need to be the same'
//                     res.render('signup', {
//                         error,
//                         UserName: req.body.UserName,
//                         BOD_Day: req.body.BOD_Day,
//                         BOD_Month: req.body.BOD_Month,
//                         BOD_Year: req.body.BOD_Year,
//                         EmailAddress: req.body.EmailAddress,
//                         FirstName: req.body.FirstName,
//                         LastName: req.body.LastName,
//                         PhoneNumber: req.body.PhoneNumber
//                     });
//                 } else {
//                     User.findOne({ username: req.body.UserName })
//                         .then(user => {
//                             if (user) {
//                                 error: 'username is already in use'
//                                 res.render('signup', {
//                                     error,
//                                     UserName: req.body.UserName,
//                                     BOD_Day: req.body.BOD_Day,
//                                     BOD_Month: req.body.BOD_Month,
//                                     BOD_Year: req.body.BOD_Year,
//                                     EmailAddress: req.body.EmailAddress,
//                                     FirstName: req.body.FirstName,
//                                     LastName: req.body.LastName,
//                                     PhoneNumber: req.body.PhoneNumber
//                                 });
//                             } else {
//                                 User.findOne({ EmailAddress: req.body.EmailAddress })
//                                     .then(user => {
//                                         if (user) {
//                                             error: 'Email is already in use'
//                                             res.render('signup', {
//                                                 error,
//                                                 UserName: req.body.UserName,
//                                                 BOD_Day: req.body.BOD_Day,
//                                                 BOD_Month: req.body.BOD_Month,
//                                                 BOD_Year: req.body.BOD_Year,
//                                                 EmailAddress: req.body.EmailAddress,
//                                                 FirstName: req.body.FirstName,
//                                                 LastName: req.body.LastName,
//                                                 PhoneNumber: req.body.PhoneNumber
//                                             });
//                                         }else{
//                                             //bcrypt the password and save the user Schema in the mongoose
//                                              const newUser = new User ({
//                                                 firstName : req.body.FirstName, 
//                                                 lastName : req.body.LastName, 
//                                                 email : req.body.EmailAddress, 
//                                                 birthDay : req.body.BOD_Day, 
//                                                 birthMonth : req.body.BOD_Month, 
//                                                 birthYear : req.body.BOD_Year, 
//                                                 username : req.body.UserName, 
//                                                 password : req.body.Password, 
//                                                 phoneNumber : req.body.PhoneNumber,
//                                                 userType : 'Passenger'
//                                              });
        
//                                              bcrypt.genSalt(10 , (err,salt) =>{
//                                                  bcrypt.hash(newUser.password , salt , (err , hash)=>{
//                                                     if(err) throw err
//                                                     newUser.password = hash; 
//                                                     newUser.save()
//                                                     .then(user=>{
//                                                         res.render('login', {
//                                                             success : 'Login to continue.'
//                                                         })
//                                                     })
//                                                     .catch(err =>{
//                                                         error: 'please input a valid data.'
//                                                         res.render('signup', {
//                                                             error,
//                                                             UserName: req.body.UserName,
//                                                             BOD_Day: req.body.BOD_Day,
//                                                             BOD_Month: req.body.BOD_Month,
//                                                             BOD_Year: req.body.BOD_Year,
//                                                             EmailAddress: req.body.EmailAddress,
//                                                             FirstName: req.body.FirstName,
//                                                             LastName: req.body.LastName,
//                                                             PhoneNumber: req.body.PhoneNumber
//                                                         });
//                                                     })
//                                                  })
//                                              })
//                                         }
//                                     })
//                             }
//                         })
//                 }
        
//             }
    
// });

// module.exports = router;