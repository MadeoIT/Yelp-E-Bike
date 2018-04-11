var express = require('express');
var router = express.Router({mergeParams: true});
var EBike = require('../models/ebike');
var Post = require('../models/post');
var isLoggedIn = require('../middleware');

router.get('/new', isLoggedIn, function(req, res) {
    EBike.findById(req.params.id, function (err, ebike) {
        if (err) {
            console.log(err);
        } else {
            res.render('posts/new', {ebike: ebike});
        }
    })
});
router.post('/', isLoggedIn, function(req, res) {
    EBike.findById(req.params.id, function (err, ebike) {
        if (err) {
            console.log(err);
        } else {
            Post.create(req.body.post, function (err, post) {
                if (err) {
                    console.log(err);
                } else {
                    post.author.id = req.user.id;
                    post.author.username = req.user.username;
                    post.save();
                    req.user.username;
                    ebike.posts.push(post);
                    ebike.save();
                    res.redirect('/ebike/' + ebike._id);
                }
            });
        }
    });
});

module.exports = router;