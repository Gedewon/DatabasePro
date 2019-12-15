const express = require('express'); 
var exphbs = require('express-handlebars');
const app = express(); 
const bodyParser = require('body-parser'); 
const mongoose = require ('mongoose'); 
const passport = require('passport');
const cookieParser = require ('cookie-parser'); 
const session = require('express-session'); 

//loading routers
const auth = require('./routes/auth');
const api = require('./routes/api'); 

//require('./config/passport')(passport); 


// ******MiddleWares*******

//router
app.use('/api' , api) ; 
app.use ('/auth' , auth);

//express  
app.use(express.static('public'));

//handlebars 
app.engine('handlebars' , exphbs({
    defaultLayout: 'main'
}));
app.set('view engine' , 'handlebars');

//body parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//mongoose 

mongoose.connect('mongodb://localhost/RailWay')
    .then(()=>{
        console.log('mongoDB connected....')
    })
    .catch (err=>console.log(err));

 //cookieParser
app.use(cookieParser()); 

//session
app.use(session({
    secret : 'secret',
    resave : false , 
    saveUninitialized : false
}));

//passport
//app.use(passport.initialize());
//app.use(passport.session());


//***********Middleware end */



const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`listening to port ${port}...`); 
});
    //accepting data from the signup form 
// require('./models/Idea');
// const New_User = mongoose.model('passenger');


//passport config


//autonitication routes

//load route


//passport middleware
 
//middle ware 

 

// app.get('/Passenger',(req,res)=>{
//     New_User.find({})
//     .sort({date : 'desc'})
//     .then(customers =>{
//         res.render('Passenger',{
//             customers:customers
//         })    
//     })
    
// });
// app.post('/signup' , (req,res)=>{
//     let Error =[];
//     if (req.body.Password != req.body.PasswordConfirm){
//         Error.push({
//             text:'Please use the same Password.'
//         })
//     }
//     if (Error.length >0){
//         res.render('signup', {
//             Error : Error,
//             FirstName : req.body.FirstName,
//             LastName : req.body.LastName,
//             UserName: req.body.UserName,
//             PhoneNumber : req.body.PhoneNumber,
//             EmailAddress: req.body.PhoneNumber,
//             Password : req.body.PhoneNumber, 
//             PasswordConfirm:req.body.PasswordConfirm
//         })
//     }else {
//         const newUser ={
//             FirstName : req.body.FirstName,
//             LastName :req.body.LastName, 
//             UserName : req.body.UserName,
//             PhoneNumber : req.body.PhoneNumber, 
//             EmailAddress : req.body.EmailAddress, 
//             Password : req.body.Password,
//             PasswordConfirm : req.body.PasswordConfirm
//         }
//         new New_User(newUser)
//         .save()
//         .then(customer=>{
//             res.redirect('/Passenger');
//         }) 
  
//     }
// });



