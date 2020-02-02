const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var global = require('../helper/global')
var user = global.get();
var key = user.userId;

const redirectPassengerLogin = (req, res, next) => {
    user = global.get();
    key = user.userId
    if (user.userType != 'passenger') {
        res.redirect('/api')
    } else {
        return next();
    }
}



console.log(global.get())
//load schema
require('../models/Booking')
require('../models/Station')
require('../models/Train')

const Booking = mongoose.model('Bookings');
const Station = mongoose.model('station');
const Train = mongoose.model('train');

//page routes
router.get('/', redirectPassengerLogin, (req, res) => {
    Booking.find({ passengerId: key, checkedIn: false })
        .limit(3)
        .sort({ date: 'desc' })
        .select('seatNumber')
        .select('time')
        .select('date')
        .populate('trainId', 'Color')
        .populate('startingStationId', 'location')
        .populate('destinationStationId', 'location')
        .then(passengerBooking => {
            res.render('Passenger/index', {
                passenger: 'passenger Page',
                Booking: passengerBooking,
                BookingViewMore: 'available'
            })
        })
});
router.get('/index/viewMore', redirectPassengerLogin, (req, res) => {
    Booking.find({ passengerId: key, checkedIn: false })
        .sort({ date: 'desc' })
        .select('seatNumber')
        .select('time')
        .select('date')
        .populate('trainId', 'Color')
        .populate('startingStationId', 'location')
        .populate('destinationStationId', 'location')
        .then(passengerBooking => {
            res.render('Passenger/index', {
                passenger: 'passenger Page',
                Booking: passengerBooking
            })
        })
});
router.get('/booking', redirectPassengerLogin, (req, res) => {
    Station.find({})
        .select('location')
        .then(stationLocation => {
            res.render('Passenger/booking', {
                passenger: 'passenger Page',
                station: stationLocation
            })
        })

})
router.get('/booking/history', redirectPassengerLogin, (req, res) => {
    Booking.find({ passengerId: key, checkedIn: true })
        .limit(3)
        .sort({ date: 'desc' })
        .select('seatNumber')
        .select('time')
        .select('date')
        .populate('trainId', 'Color')
        .populate('startingStationId', 'location')
        .populate('destinationStationId', 'location')
        .then(passengerBooking => {
            res.render('Passenger/history', {
                passenger: 'passenger Page',
                Booking: passengerBooking,
                BookingViewMore: 'available'
            })
        })
});
router.get('/booking/history/viewMore', redirectPassengerLogin, (req, res) => {
    Booking.find({ passengerId: key, checkedIn: true })
        .sort({ date: 'desc' })
        .select('seatNumber')
        .select('time')
        .select('date')
        .populate('trainId', 'Color')
        .populate('startingStationId', 'location')
        .populate('destinationStationId', 'location')
        .then(passengerBooking => {
            res.render('Passenger/history', {
                passenger: 'passenger Page',
                Booking: passengerBooking
            })
        })
})
router.post('/book', redirectPassengerLogin , (req, res) => {
    let newBooking = new Booking({
        passengerId: key,
        trainId: '',
        startingStationId: '',
        destinationStationId: '',
        seatNumber: req.body.seatNumber,
        date: req.body.Date,
        time: req.body.Time,
        checkedIn: false
    })
    var startingStation = req.body.StartingStation
    var destinationStation = req.body.DestinationStation
    var startingId = null;
    var destinationId = null;
    var startingId2 = null;
    var destinationId2 = null;
    var pathchangeStation = null
    let trainColor = null
    let isPath1 = false
    if (startingStation == destinationStation || startingStation == 'null' ||
        destinationStation == 'null') {
        //error in choosing 
        Station.find({})
            .select('location')
            .then(stationLocation => {
                res.render('Passenger/booking', {
                    passenger: 'passenger Page',
                    error: 'Please select Different starting and destination stations',
                    station: stationLocation
                })
            })

    }
    //compare date and send error message


    else {
        if (startingStation == 'Torhailoch'
            || startingStation == 'Stadium' || startingStation == 'Ayat') {
            //path1 from Torhailoch to Ayat
            trainColor = 'Blue'
            if (destinationStation == 'Torhailoch' || destinationStation == 'Stadium'
                || destinationStation == 'Ayat') {
                pathchangeStation = destinationStation
            } else {
                pathchangeStation = 'Stadium'
            }

        } else {
            trainColor = 'Green'
            if (destinationStation == 'Lancha'
                || destinationStation == 'Saris') {
                pathchangeStation = destinationStation

            } else {
                pathchangeStation = 'Stadium'

            }

        }
        if (pathchangeStation == destinationStation) {
            //create a one path for passenger
            Train.findOne({ Color: trainColor })
                .select('_id')
                .then(train => {
                    newBooking.trainId = train._id;
                    Station.findOne({ location: startingStation })
                        .select('_id')
                        .then(startingStation => {
                            newBooking.startingStationId = startingStation._id
                            Station.findOne({ location: destinationStation })
                                .select('_id')
                                .then(destinationStation => {
                                    newBooking.destinationStationId = destinationStation._id
                                    newBooking.save()
                                        .then(booked => {
                                            Station.find({})
                                                .select('location')
                                                .then(stationLocation => {
                                                    res.render('Passenger/booking', {
                                                        passenger: 'passenger Page',
                                                        success: 'booked',
                                                        station: stationLocation
                                                    })
                                                })
                                        })
                                })
                        })
                })


        } else {
            //create a two path for passenger
            let trainColor2 = null;
            if (trainColor == 'Blue') trainColor2 = 'Green'
            else trainColor2 = 'Blue'

            Train.findOne({ Color: trainColor })
                .select('_id')
                .then(train => {
                    newBooking.trainId = train._id;
                    Station.findOne({ location: startingStation })
                        .select('_id')
                        .then(startingStation => {
                            startingId2 = startingStation._id
                            Station.findOne({ location: pathchangeStation })
                                .select('_id')
                                .then(destinationStationId => {
                                    destinationId2 = destinationStationId._id
                                    newBooking.startingStationId = startingId2
                                    newBooking.destinationStationId = destinationId2
                                    newBooking.save()
                                })
                        })
                })
            let newBooking2 = new Booking({
                passengerId: key,
                trainId: '',
                startingStationId: '',
                destinationStationId: '',
                seatNumber: req.body.seatNumber,
                date: req.body.Date,
                time: req.body.Time,
                checkedIn: false
            })
            Train.findOne({ Color: trainColor2 })
                .select('_id')
                .then(train => {
                    newBooking2.trainId = train._id;
                    Station.findOne({ location: pathchangeStation })
                        .select('_id')
                        .then(startingStation => {
                            startingId = startingStation._id
                            Station.findOne({ location: destinationStation })
                                .select('_id')
                                .then(destinationStationId => {
                                    destinationId = destinationStationId._id
                                    newBooking2.startingStationId = startingId
                                    newBooking2.destinationStationId = destinationId
                                    newBooking2.save().then(booked => {
                                        Station.find({})
                                            .select('location')
                                            .then(stationLocation => {
                                                res.render('Passenger/booking', {
                                                    passenger: 'passenger Page',
                                                    success: 'Please select Different starting and destination stations',
                                                    station: stationLocation
                                                })
                                            })
                                    })
                                })
                        })
                })



        }

    }
})
router.delete('/cancel/:id', redirectPassengerLogin , (req, res) => {
    Booking.deleteOne({ _id: req.params.id })
        .then(() => {
            Booking.find({ passengerId: key, checkedIn: false })
                .limit(3)
                .sort({ date: 'desc' })
                .select('seatNumber')
                .select('time')
                .select('date')
                .populate('trainId', 'Color')
                .populate('startingStationId', 'location')
                .populate('destinationStationId', 'location')
                .then(passengerBooking => {
                    res.render('Passenger/index', {
                        passenger: 'passenger Page',
                        Booking: passengerBooking
                    })
                })
        })
})
module.exports = router
