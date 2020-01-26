const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Booking Schema 

const BookingSchema = new Schema({
    passengerUsername: {
        //forigen key from passenger table
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true,
    },
    trainId: {
        //forigen key from train table
        type: String, 
        minlength: 3,
        required : true,
    },
    routeId: {
        //forigen key from route table
        type: String, 
        minlength: 3,
        required : true,
    }, 
    seatNumber : {
        type : Number, 
        required : true
    }, 
    date : {
        type : Date,
        default : Date.now(), 
    },
    time :{
        type: String, 
        minlength : 5,
        maxlength : 5,
        required: true
    }

    
    
})

mongoose.model('Bookings', BookingSchema); 