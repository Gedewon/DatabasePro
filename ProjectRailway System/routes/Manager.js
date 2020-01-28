const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const key = '5e302db5a77ffa45b0242fd6';

//load schema
require('../models/Booking')
require('../models/Manager')

const Booking = mongoose.model('Bookings');
const Manager = mongoose.model('managers')

router.get('/', (req, res) => {
    Manager.findOne({ _id: key })
        .select('stationId')
        .then(managerLocation => {
            Booking.find({ startingStationId: managerLocation.stationId })
                .sort({ date: 'ascending' })
                .then(bookings => {
                    res.render('Manager/index', {
                        manager: 'manager Page',
                        booking : bookings
                    })

                })
        })

});
router.get("/hire" , (req,res)=>{
    res.render('Manager/hireManager', {
        manager : 'manager Page'
    })
});

router.get("/trains" , (req,res)=>{
    res.render('Manager/trains', {
        manager : 'manager Page'
    })
});
router.put('/checkIn/:id', (req, res) => {
    res.send("put")
})


module.exports = router
