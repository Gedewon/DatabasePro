const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { validate } = require('../models/Validation/PassengerValidation.js');

require('../models/Passenger')
const Passenger = mongoose.model('passengers');
//registering passenger
router.post('/passenger', (req, res) => {
    const userVal_Data = {
        username: req.body.UserName,
        password: req.body.Password,
        birthDay: req.body.BOD_Day,
        birthMonth: req.body.BOD_Month,
        birthYear: req.body.BOD_Year,
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        phoneNumber: req.body.PhoneNumber,
        city: req.body.city,
        subCity: req.body.subCity,
        kebele: req.body.kebele,
        homeNumber: req.body.homeNumber,
    }
    const { error } = validate(userVal_Data);
    if (error) {
        res.render('signup', {
            error: error.details[0].message,
            UserName: req.body.UserName,
            BOD_Day: req.body.BOD_Day,
            BOD_Month: req.body.BOD_Month,
            BOD_Year: req.body.BOD_Year,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            PhoneNumber: req.body.PhoneNumber,
            city: req.body.city,
            subCity: req.body.subCity,
            kebele: req.body.kebele,
            homeNumber: req.body.homeNumber,
        })
    } else {
        const newUser = new Passenger({
            username: req.body.UserName,
            password: req.body.Password,
            birthDay: req.body.BOD_Day,
            birthMonth: req.body.BOD_Month,
            birthYear: req.body.BOD_Year,
            firstName: req.body.FirstName,
            lastName: req.body.LastName,
            sex: req.body.gridRadios
        });
        newUser.save()
        .then(user => {
            res.send('ok');
        })
    }
});


module.exports = router;