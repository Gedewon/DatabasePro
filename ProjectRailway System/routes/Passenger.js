const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose');

require('../models/Booking')
const Booking = mongoose.model('Bookings');

//routes

router.get('/' , (req, res)=>{
    Booking.find({})
    .sort({date : 'desc'})
    .then(passenger =>{
        res.render('Passenger/index' , {
            passenger : 'passenger page', 
            Booking : Booking 
        })
    })
}); 

module.exports = router
