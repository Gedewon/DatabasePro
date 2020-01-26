const express = require('express'); 
const router = express.Router(); 
const { validate_login } = require('./models/ValidateLoginInput');

//routes
router.get('/login' , (req,res)=>{
    let LogingInput = {
        username : req.body.userName, 
        password : req.body.password
    }
    const {error} = validate_login(LogingInput);
    if (error) {
        res.render('login',{
            error : 'Invalid username and password.', 
            username : req.body.userName, 
            password : req.body.password
        })
    }else{
        User.findOne({username : req.body.userName})
        .then(user=>{
            if(!user){
                res.render('login',{
                    error : 'Invalid username and password.', 
                    username : req.body.userName, 
                    password : req.body.password
                })
            }else{
               const isCorrectPassword =  bcrypt.compareSync(req.body.password , user.password);
               if(!isCorrectPassword){
                res.render('login',{
                    error : 'Invalid username and password.', 
                    username : req.body.userName, 
                    password : req.body.password
                })
               } else{
                   //route to /api/user/main for passengers
                    if(user.userType =='Manager'){
                        res.render('/user/main'); 
                    }else{
                        res.render('/manager/main'); 
                    }
                   //route to /api/manager/main for managers
               }
            }
        })
        
    }
}); 

module.exports = router