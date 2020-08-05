// require() get the express package
var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Tiger", image: "https://scx1.b-cdn.net/csz/news/800/2019/tiger.jpg"},
        {name: "Lion", image: "https://cdn.mos.cms.futurecdn.net/J9KeYkEZf4HHD5LRGf799N-320-80.jpg"},
        {name: "Shark", image: "https://scitechdaily.com/images/Great-White-Shark-Smile.jpg"}
    ]
    res.render("campgrounds",{campgrounds: campgrounds});
});

// Starting listening for request.
app.listen(3000, function() {
    console.log("Started");
});