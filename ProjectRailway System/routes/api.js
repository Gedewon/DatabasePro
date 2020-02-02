const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

var global = require('../helper/global')
var user = global.get();

const redirectHome = (req, res, next) => {
    user = global.get();
    if (user.userId != 'null' && user.userType == 'manager') {
        res.redirect('/api/login/manager')
    } else if (user.userId != 'null' && user.userType == 'passenger') {
        res.redirect('/api/login/passenger')
    } else {
        next()
    }
}

//load models
require('../models/Passenger')
require('../models/Manager')
require('../models/Comment')

const Comment = mongoose.model('Comments')
const Passenger = mongoose.model('passengers')
const Manager = mongoose.model('managers')
//routes
router.get('/', redirectHome, (req, res) => {
    res.render('index', {
        home: 'api homepages',
        Home: 'homepage'
    })
});
router.get('/login', redirectHome, (req, res) => {
    res.render('login', {
        home: 'api homepages'
    })
});
router.get('/signup', redirectHome, (req, res) => {
    res.render('signup', {
        home: 'api homepages'
    })
});

router.post('/comment', (req, res) => {
    const newComment = new Comment({
        Name: req.body.name,
        Email: req.body.email,
        Comment: req.body.comments
    })
    newComment.save()
        .then(comments => {
            res.redirect('/api')
        })
});

router.post('/login', (req, res) => {
    if (req.body.manager == 'on') {
        //search for manager 

        Manager.findOne({ username: req.body.userName })
            .then(user => {
                if (user) {
                    //check for password
                    bcrypt.compare(req.body.password, user.password).then((pass)=>{
                        console.log(pass)
                        if (!pass) {
                            res.render('login', {
                                error: 'Invalid Username and Password',
                                home: 'api homepages',
                                username: req.body.userName
                            });
                        } else {
                            req.session.userId = user._id;
                            req.session.userType = 'manager'
                            global.set(user._id, 'manager')
                            res.redirect('/api/login/manager')
                        }
                    })
                        // pass == true
                } else {
                    res.render('login', {
                        home: 'api homepages',
                        error: 'Invalid Username and Password',
                        username: req.body.userName
                    });
                }
            })
    } else {
        //search for passenger 
        Passenger.findOne({ username: req.body.userName })
            .then(user => {
                if (user) {
                    //check for password
                    bcrypt.compare(req.body.password, user.password).then((pass)=>{
                        console.log(pass)
                        if (!pass) {
                            res.render('login', {
                                home: 'api homepages',
                                error: 'Invalid Username and Password',
                                username: req.body.userName
                            });
                        } else {
                            req.session.userId = user._id;
                            req.session.userType = 'passenger'
                            global.set(user._id, 'passenger')
                            res.redirect('/api/login/passenger')
                        }
                    })
                    
                } else {
                    res.render('login', {
                        home: 'api homepages',
                        error: 'Invalid Username and Password',
                        username: req.body.userName
                    })
                }
            })
    }

});
router.get('/logout', (req, res) => {
    global.set('null', 'null');
    res.redirect('/api/login')
});
module.exports = router