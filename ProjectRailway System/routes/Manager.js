const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var global = require('../helper/global')
var user = global.get();
var key = user.userId;

const redirectManagerLogin = (req, res, next) => {
    user = global.get();
    key = user.userId;
    if (user.userType != 'manager') {
        res.redirect('/api')
    } else {
        return next();
    }
}

//load schema
require('../models/Booking')
require('../models/Manager')
require('../models/Station')
require('../models/Train')

const Booking = mongoose.model('Bookings');
const Manager = mongoose.model('managers')
const Station = mongoose.model('station')
const Train = mongoose.model('train')

//routes
router.get('/', redirectManagerLogin, (req, res) => {
    Manager.findOne({ _id: key })
        .select('stationId')
        .then(managerLocation => {
            Booking.find({ startingStationId: managerLocation.stationId, checkedIn: false })
                .sort({ date: 1 })
                .populate('passengerId')
                .populate('destinationStationId')
                .then(bookings => {
                    res.render('Manager/index', {
                        manager: 'manager Page',
                        booking: bookings
                    })

                })
        })

});
router.get("/hire", redirectManagerLogin, (req, res) => {
    Station.find()
        .select('location')
        .then(station => {
            res.render('Manager/hireManager', {
                manager: 'manager Page',
                station: station
            })
        })

});

router.get("/trains", redirectManagerLogin, (req, res) => {
    Train.find({ TrainAvailable: true })
        .then(trains => {
            Train.find({ TrainAvailable: false })
                .then(unavailableTrain => {
                    res.render('Manager/trains', {
                        manager: 'manager Page',
                        trains: trains,
                        unavailableTrain: unavailableTrain
                    })
                })
        })

});
router.put('/checkIn/:id', redirectManagerLogin,(req, res) => {
    Booking.findOne({ _id: req.params.id })
        .then(updateBooking => {
            updateBooking.checkedIn = true
            updateBooking.save()
                .then(() => {
                    res.redirect('/api/login/manager')
                })
        })
});
router.put('/train/checkout/:id', redirectManagerLogin,(req, res) => {
    Train.findOne({ _id: req.params.id })
        .then(train => {
            train.TrainAvailable = false
            train.save()
                .then(() => {
                    res.redirect('/api/login/manager/trains')
                })
        })
});

router.put('/train/checkIn/:id',redirectManagerLogin, (req, res) => {
    Train.findOne({ _id: req.params.id })
        .then(train => {
            train.TrainAvailable = true
            train.save()
                .then(() => {
                    res.redirect('/api/login/manager/trains')
                })
        })
});

module.exports = router
