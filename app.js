var express = require('express');
    app = express();
    path = require('path');
    mongoose = require('mongoose');
    passport = require('passport');
    LocalStrategy = require('passport-local');
    bodyParser = require('body-parser');
    methodOverride = require('method-override');
    EBike = require('./models/ebike');
    Post = require('./models/post');
    User = require('./models/user');
    seedDB = require('./seeds');

var ebikeRoutes =  require('./routes/ebike');
    postsRoutes = require('./routes/posts');
    authRoutes = require('./routes/index');

mongoose.connect("mongodb://localhost/ebike_data");
app.use(express.static(__dirname + '/public'));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "ebike mobility renewable clean green",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use('/ebike', ebikeRoutes);
app.use('/ebike/:id/posts', postsRoutes);
app.use(authRoutes);

app.get('/', function(req, res){
    res.render("home");
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});