var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var isLoggedIn = require('../middleware');

router.get('/register', function(req, res) {
    res.render('register');
});
router.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
            passport.authenticate('local')(req, res, function () {
                res.redirect('/ebike');
            })
        }
    })
});
router.get('/login', function(req, res) {
    res.render('login');
});
router.post('/login', passport.authenticate("local", 
    {
    successRedirect: "/ebike",
    failureRedirect: "/login"
    }), function(req, res) {
});
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect("/ebike");
});

module.exports = router;