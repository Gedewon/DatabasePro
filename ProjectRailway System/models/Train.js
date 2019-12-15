const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create a train schema 

const NewTrainSchema = new Schema({
    Train_id : {
        //need to be primary key
        type : int , 
        required : true
    }, 
    Size : {
        type : String,
        required : true 
    } , 
    Color : {
        type : String , 
        required : true 
    }
}); 

mongoose.model('train' , NewTrainSchema); 