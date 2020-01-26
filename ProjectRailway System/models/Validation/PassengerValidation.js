const Joi = require('joi'); 
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

//validating function
function validateUser(User){
    const Schema = {
        //for Passenger Schema
        username : Joi.string()
        .alphanum()
        .required(),
        firstName : Joi.string()
        .min(3)
        .max(50)
        .required(), 
        lastName : Joi.string()
        .min(3)
        .max(50)
        .required(),
        birthDay: Joi.number()
        .min(1)
        .max(30)
        .required(),
        birthMonth: Joi.number()
        .min(1)
        .max(12)
        .required(),
        birthYear: Joi.number()
        .min(1970)
        .max(2010)
        .required(),
        password : Joi.string()
        //.pattern(new RegExp('^[a-zA-Z0-9]$'))
        .required(), 

        //for Address Schema
        city : Joi.string()
        .required()
        .min(3)
        .max(50),
        subCity : Joi.string()
        .min(3)
        .max(50),
        kebele : Joi.string()
        .required()
        .min(3)
        .max(50),
        homeNumber : Joi.number()
        .required(),
        //for phone Number schema
        phoneNumber : Joi.string()
        .required()
        
    }
    return Joi.validate(User , Schema ); 
}
exports.validate = validateUser;