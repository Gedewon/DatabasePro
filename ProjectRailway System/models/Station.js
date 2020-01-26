const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create a Station schema 

const StationSchema = new Schema({
    location :{
        type: String, 
        minlength : 5,
        maxlength : 5,
        required: true
    },
    sequencingNumber:{
        type: String, 
        required: true,
        unique : true
    }
    
}); 

mongoose.model('station' , StationSchema); 