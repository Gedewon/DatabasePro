const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create PhoneNumber Schema 

const PhoneNumberSchema = new Schema({
    username: {
        //forigen key
        type: Schema.Types.ObjectId,
        ref : 'passengers'
    },
    
    PhoneNumber : {
        type : String , 
        minlength : 10,
        maxlength : 13 , 
        required : true
    }
})

mongoose.model('phoneNumber', PhoneNumberSchema); 