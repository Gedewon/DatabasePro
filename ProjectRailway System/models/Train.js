const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create a train schema 

const NewTrainSchema = new Schema({
    Size : {
        type : Number,
        required : true 
    } , 
    AvailableSeat :{
        type : Number,
        required : true
    }, 
    Color : {
        type : String , 
        required : true 
    }
}); 

mongoose.model('train' , NewTrainSchema); 