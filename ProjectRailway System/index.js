const express = require('express');
var exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const methodOverride = require('method-override')

//loading routers
const api = require('./routes/api');
const register = require('./routes/Register'); 
const passenger = require('./routes/Passenger'); 
const manager = require('./routes/Manager')

// ******MiddleWares*******//

//express  
app.use(express.static('public'));

//handlebars 
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//methodOverride
app.use(methodOverride('_method'))


//mongoose 

mongoose.connect('mongodb://localhost/RailWay')
    .then(() => {
        console.log('mongoDB connected....')
    })
    .catch(err => console.log(err));

// *******Middle Ware end*****************//

//router
app.use('/api', api);
app.use('/api/register',register); 
app.use('/api/login/passenger' , passenger); 
app.use('/api/login/manager', manager); 

//adding sample data
require('./models/Booking')
require ('./models/Train')
require('./models/Station')
require('./models/Manager')

const Manager = mongoose.model('managers')
const Station = mongoose.model('station')
const Booking = mongoose.model('Bookings')
const Train = mongoose.model('train')

const newManager = new Manager({
    username : 'darikMohammed' , 
    firstName: 'Darik',
    lastName : 'Mohammed', 
    birthDay : 5 , 
    birthMonth : 12 , 
    birthYear : 2014,
    sex : 'M' , 
    password : 'darik1234111',
    stationId : '5e2e87e0d4346d360811d2b0'
})
const newStation = new Station({
    location : 'Torhailoch', 
    sequencingNumber : 'T20005'
})
const newStation2 = new Station({
    location : 'Stadium', 
    sequencingNumber : 'S10005'
})
const newTrain = new Train({
    Size : 255,
    AvailableSeat: 255,
    Color : 'Blue'
})

const newBooking = new Booking({
    passengerId : '5e2e85fcf063c417c079babd' , 
    trainId: '5e2e872aab596834603ba95f',
    startingStationId : '5e2e87e0d4346d360811d2b0',
    destinationStationId : '5e2e87e1d4346d360811d2b1', 
    seatNumber: 5,
    time : '7:30 am'
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});



