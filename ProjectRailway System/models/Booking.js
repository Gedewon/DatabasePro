const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Booking Schema 

const BookingSchema = new Schema({
    passengerId: {
        //forigen key from passenger table
        type: Schema.Types.ObjectId,
        ref : 'passengers'
    },
    trainId: {
        //forigen key from train table
        type: Schema.Types.ObjectId,
        ref : 'train'
    },
    startingStationId : {
        //foreign key
        type: Schema.Types.ObjectId,
        ref : 'station'
    }, 
    destinationStationId : {
        //foreign key
        type: Schema.Types.ObjectId,
        ref : 'station'
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
        maxlength : 8,
        required: true
    }, 
    checkedIn : {
        type : Boolean,
        required : true,
        default : false
    }

    
    
})

mongoose.model('Bookings', BookingSchema); 