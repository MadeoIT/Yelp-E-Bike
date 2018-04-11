var express = require('express');
var router = express.Router();
var EBike = require('../models/ebike');
var Post = require('../models/post');
var isLoggedIn = require('../middleware');

router.get('/', function(req, res) {
    EBike.find({}, function (err, ebikes) {
        if(err){
            console.log(err);
        } else {
            res.render("ebike/ebike", 
            {
                ebikes: ebikes,
                currentUser: req.user
            });
        }
    });
});
router.get('/new', isLoggedIn, function(req, res) {
    res.render("ebike/new");
});
router.post('/', isLoggedIn, function(req, res) {
    var model = req.body.model;
    var brand = req.body.brand;
    var power = req.body.power;
    var bikeClass = req.body.bikeClass;
    var picture = req.body.picture;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newEbike = {
        model: model,
        brand: brand,
        power: power,
        bikeClass: bikeClass,
        picture: picture,
        author: author
    }
    
    EBike.create(newEbike, function(err, newOBJ) {
        if(err){
            console.log("Something went wrong")
        } else {
            res.redirect('ebike');
        }
    }); 
});
router.get('/:id', function(req, res) {
    EBike.findById(req.params.id).populate("posts").exec(function (err, foundEbike) {
        if(err){
            console.log(err);
        } else {
            res.render('ebike/show', {foundEbike: foundEbike});
        }
    });
});
router.get('/:id/edit', authorization, function(req, res) {
    EBike.findById(req.params.id, function (err, editEbike) {
       res.render('ebike/edit', {editEbike: editEbike});
    });
});

router.put('/:id', authorization, function(req, res) {
    EBike.findByIdAndUpdate(req.params.id, req.body.ebike, function (err, updatedEbike) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/ebike/' + updatedEbike._id);
        }
    })
});

router.delete('/:id', authorization, function(req, res) {
    EBike.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });   
});

function authorization (req, res, next) {
    if (req.isAuthenticated()){
        EBike.findById(req.params.id, function (err, editEbike) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if(editEbike.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }}});
    } else {
        res.redirect("back");
    }};

module.exports = router;