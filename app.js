// require() get the express package
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

// requiring routes
var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var indexRoutes = require("./routes/index")


// var campgrounds = [
//     {name: "Tiger", image: "https://scx1.b-cdn.net/csz/news/800/2019/tiger.jpg"},
//     {name: "Lion", image: "https://cdn.mos.cms.futurecdn.net/J9KeYkEZf4HHD5LRGf799N-320-80.jpg"},
//     {name: "Shark", image: "https://scitechdaily.com/images/Great-White-Shark-Smile.jpg"}
// ];

mongoose.connect("mongodb://localhost/yelpCamp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
console.log(__dirname);
// seedDB();

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false

}));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

// Starting listening for request
app.listen(3000, function() {
    console.log("Started");
});