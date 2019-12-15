const express = require('express'); 
const router = express.Router(); 

//routes
router.get('/', (req,res)=>{
    res.render('index',{
        Home:'homepage'
    })
});
router.get('/login', (req,res)=>{
    res.render('login')
});
router.get('/signup', (req,res)=>{
    res.render('signup')
});

module.exports = router