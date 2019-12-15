const Googlestrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); 
const key = require('./keys'); 
const Passenger = mongoose.model('passengers');

module.exports = function(passport){
    passport.use(
        new Googlestrategy({
            clientID : key.googleClientID ,
            clientSecret : key.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy : true
        },(accessToken , refreshToken,profile,done) =>{
            const NewPassenger = {
                googleID : profile.id, 
                firstName : profile.name.givenName,
                lastName : profile.name.familyName, 
                email : profile.emails[0].value
            }
            Passenger.findOne({
                googleId : profile.id
            }).then(passenger =>{
                done(null , passenger); 
            })
        })
    );
    passport.serializeUser((passenger,done)=>{
        done(null, passenger.id); 
    });
    passport.deserializeUser((id,done)=>{
        Passenger.findById(id).then(passenger =>done (null,passenger))
    });
}