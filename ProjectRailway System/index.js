const express = require('express');
var exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const methodOverride = require('method-override')

const FOUR_HOURS = 1000 * 60 * 60 * 4;
const {
    SESS_LIFETIME = FOUR_HOURS,
    SESS_NAME = 'sid',
    SESS_SECRET = 'secret'
} = process.env


//loading routers
const api = require('./routes/api');
const register = require('./routes/Register');
const passenger = require('./routes/Passenger');
const manager = require('./routes/Manager')

// ******MiddleWares*******//

//express  
app.use(express.static('public'));

//session

app.use(session({
    name : SESS_NAME,
    resave: false, 
    saveUninitialized : false, 
    secret : SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite : true, 
        secure : true
    }
}))


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
app.use('/api/register', register);
app.use('/api/login/passenger', passenger);
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

const newStation = new Station({
    location : 'Torhailoch', 
    sequencingNumber : 'T20005'
})
const newStation2 = new Station({
    location : 'Stadium', 
    sequencingNumber : 'S10005'
})
const newStation3 = new Station({
    location : 'Saris', 
    sequencingNumber : 'S10005'
})
const newStation4 = new Station({
    location : 'Lancha', 
    sequencingNumber : 'S10005'
})
const newStation5 = new Station({
    location : 'Ayat', 
    sequencingNumber : 'S10005'
})
Station.findOne({})
.then(station=>{
    if(!station){
        newStation.save()
        newStation2.save()
        newStation3.save()
        newStation4.save()
        newStation5.save()
    }
})

const newManager = new Manager({
    username : 'newManager' , 
    firstName: 'Darik',
    lastName : 'Mohammed', 
    birthDay : 5 , 
    birthMonth : 12 , 
    birthYear : 2014,
    sex : 'M' , 
    password : '$2a$10$fJ3bygiBJsly2j//DhYewe1jVOgihikSCJtzxMnDmYdTBBA4g.W/e', //PASSWORD 1234567890
    stationId : newStation._id
})
Manager.findOne({})
.then(manager =>{
    if(!manager){
        newManager.save()
    }
})

const newTrain = new Train({
    Size : 255,
    AvailableSeat: 255,
    Color : 'Blue'
})
const newTrain1 = new Train({
    Size : 255,
    AvailableSeat: 255,
    Color : 'Green'
})
Train.findOne({})
.then(train=>{
    if(!train){
        newTrain.save()
        newTrain1.save()
    }

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});



