const express = require('express'); 
const router = express.Router(); 

//routes
router.get('/', (req,res)=>{
    res.render('index',{
        home : 'api homepages',
        Home:'homepage'
    })
});
router.get('/login', (req,res)=>{
    res.render('login' , {
        home : 'api homepages'
    })
});
router.get('/signup', (req,res)=>{
    res.render('signup' , {
        home : 'api homepages'
    })
});

module.exports = router