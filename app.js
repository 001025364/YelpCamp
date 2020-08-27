// require() get the express package
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
// var campgrounds = [
//     {name: "Tiger", image: "https://scx1.b-cdn.net/csz/news/800/2019/tiger.jpg"},
//     {name: "Lion", image: "https://cdn.mos.cms.futurecdn.net/J9KeYkEZf4HHD5LRGf799N-320-80.jpg"},
//     {name: "Shark", image: "https://scitechdaily.com/images/Great-White-Shark-Smile.jpg"}
// ];
seedDB();
mongoose.connect("mongodb://localhost/yelpCamp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// schema set up


// Campground.create({
//     name : "Tiger",
//     image: "https://scx1.b-cdn.net/csz/news/800/2019/tiger.jpg",
//     description: "Cute tiger"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATE CAMPGROUND");
//         console.log(campground);
//     }
// });


app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds : allCampgrounds});
        }
    });
    //res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {    
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // campgrounds.push(newCampground);
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            // Redirect to campgrounds page
            res.redirect("./campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
    // find the campground with id
    //
    //res.send("this will be the show page");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
    
});
app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){

})

// Starting listening for request
app.listen(3000, function() {
    console.log("Started");
});