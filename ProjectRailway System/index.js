const express = require('express');
var exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

//loading routers
const api = require('./routes/api');
const register = require('./routes/Register'); 
const passenger = require('./routes/Passenger'); 


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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});



