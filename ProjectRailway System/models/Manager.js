const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Manager Schema 

const ManagerSchema = new Schema({
    username: {
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true,
        unique : true
    },
    firstName: {
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true
    }, 
    lastName: {
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true
    },
    birthDay : {
        type : Number , 
        minlength : 1,
        maxlength : 2 , 
        required : true
    },
    birthMonth :{
        type : Number , 
        minlength : 1,
        maxlength : 2 , 
        required : true
    },
    birthYear :{
        type :Number, 
        minlength : 4,
        maxlength:4,
        required: true
    }, 
    sex : {
        type : String, 
        required : true
    },
    password : {
        type : String, 
        minlength: 6, 
        maxlength:1024,
        required : true
    },
    stationId : {
        //foreign key
        type : Schema.Types.ObjectId,
        ref : 'station'
    }
})

mongoose.model('managers', ManagerSchema); 