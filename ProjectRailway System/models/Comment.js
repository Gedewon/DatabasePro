const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Booking Schema 

const CommentSchema = new Schema({
    Name: {
        type:String , 
        required : true
    },
    Email: {
        type: String,
        required : true
    },
    Comment : {
        type : String, 
        required : true
    },     
})

mongoose.model('Comments', CommentSchema); 