const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Address Schema 

const AddressSchema = new Schema({
    userId: {
        //forigen key
        type: Schema.Types.ObjectId,
        ref : 'passengers'
    },
    city: {
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true
    },
    subCity: {
        type: String, 
        minlength: 3,
        maxlength: 50
    }, 
    kebele: {
        type: String, 
        minlength: 3,
        maxlength: 50,
        required : true
    },
    homeNumber : {
        type : Number , 
        minlength : 1,
        maxlength : 12 , 
        required : true
    }
})

mongoose.model('address', AddressSchema); 