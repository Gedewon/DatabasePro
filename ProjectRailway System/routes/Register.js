const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { validate } = require('../models/Validation/PassengerValidation.js');

require('../models/Passenger')
require('../models/Manager')
require('../models/Address')
require('../models/PhoneNumber')
require('../models/Station')

const Passenger = mongoose.model('passengers');
const Manager = mongoose.model('managers')
const Address = mongoose.model('address');
const PhoneNumber = mongoose.model('phoneNumber');
const Station = mongoose.model('station')

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
        const newAddress = new Address({
            userId: newUser._id,
            city: req.body.city,
            subCity: req.body.subCity,
            kebele: req.body.kebele,
            homeNumber: req.body.homeNumber
        })
        const newPhoneNumber = new PhoneNumber({
            userId: newUser._id,
            PhoneNumber: req.body.PhoneNumber
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save()
                    .then(() => {
                        newAddress.save().then(() => {
                            newPhoneNumber.save().then(() => {
                                res.render('login', {
                                    home: 'api homepages',
                                    success: "Login to continue"
                                })
                            })
                        })
                    }).catch(err => {
                        res.render('signup', {
                            error: err,
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
                    })
            });
        });

    }
});

router.post('/manager', (req, res) => {
    if (req.body.Location == 'null') {
        res.render('signup', {
            error: 'Select Managers Branch!',
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
            const newUser = new Manager({
                username: req.body.UserName,
                password: req.body.Password,
                birthDay: req.body.BOD_Day,
                birthMonth: req.body.BOD_Month,
                birthYear: req.body.BOD_Year,
                firstName: req.body.FirstName,
                lastName: req.body.LastName,
                sex: req.body.gridRadios,
                stationId: ''
            });
            const newAddress = new Address({
                userId: newUser._id,
                city: req.body.city,
                subCity: req.body.subCity,
                kebele: req.body.kebele,
                homeNumber: req.body.homeNumber
            })
            const newPhoneNumber = new PhoneNumber({
                userId: newUser._id,
                PhoneNumber: req.body.PhoneNumber
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    Station.findOne({ location: req.body.Location })
                        .then(station => {
                            newUser.stationId = station._id
                            newUser.save()
                                .then(() => {
                                    newAddress.save().then(() => {
                                        newPhoneNumber.save().then(() => {
                                            res.render('Manager/hireManager', {
                                                manager: 'api homepages',
                                                success : 'success'
                                            })
                                        })
                                    })
                                }).catch(err => {
                                    res.render('signup', {
                                        error: err,
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
                                })
                        })
                });
            });

        }
    }
});

module.exports = router;