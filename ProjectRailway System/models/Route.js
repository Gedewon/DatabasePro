const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create a Route schema 

const RouteSchema = new Schema({
    trainId :{
        //foreign key
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true,
    },
     
    startingStationId : {
        //foreign key
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true,
    }, 
    destinationStationId : {
        //foreign key
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true,
    }
}); 

mongoose.model('routes' , RouteSchema); 