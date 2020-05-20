var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const request = require('request');
var ip_data ='125.19.12.216';
var expressSanitizer = require("express-sanitizer");

//mongodb packages
var mongoose = require("mongoose");

//passport packages
var LocalStrategy = require("passport-local");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");

//importing user model
var User = require("./models/user");
var Dashboard = require("./models/dashboard");
var Enquiry = require("./models/enquiry");

//encryting password
app.use(require("express-session")({
  secret: "kuch bhi likh do",
  resave: false,
  saveUninitialized: false
}));


//Connecting to mongodb server and storing ip_data
mongoose.connect("mongodb://localhost:27017/uson_mechanics1", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

//body parser import
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use( express.static( "public" ));

//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//passing current user to every route
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//landing page route
app.get("/", function(req, res){
  res.render("index.ejs");
  // res.send("This is the main page");
});

//IP finder API Route
app.get("/ip", isLoggedIn, function(req, res){
  request("http://api.ipstack.com/check?access_key=e93a0af9a29cc5c42ce47d86a479d92a", function(error, reponse, body){
    var data = JSON.parse(body);
    ip_data=data["ip"];
    // console.log(ip_data);
    // res.send("This is your ip address");
    res.redirect("/location");
  });

});

//Login Route
app.get("/login", function(req, res){
  res.render("login.ejs");
})

//Loation finder API Route
app.get("/location", function(req, res){
  var options = {
    method: 'GET',
    url: 'https://apility-io-ip-geolocation-v1.p.rapidapi.com/' + ip_data,
    headers: {
      'x-rapidapi-host': 'apility-io-ip-geolocation-v1.p.rapidapi.com',
      'x-rapidapi-key': '794f669ae2mshef845293222940ep1737d9jsn3243b0d5c3da',
      accept: 'application/json'
    }
  };
  request(options, function (error, response, body) {
  	if (error) throw new Error(error);
    // res.send("Locate your nearest service center");
    var data = JSON.parse(body);
  	console.log(data);
  	res.render("location_details.ejs", {data: data});
  });
});

//Auth Routes
//Register Routes
app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  req.body.username
  req.body.password
  // User.email= req.body.email;

  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      // passReqToCallback: true
      // console.log(req.body.email);
      res.redirect("/");
    });
  });
  var username = req.body.username;
  var age = req.body.age;
  var gender = req.body.gender;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var address = req.body.address;
  var newDashboard = {username: username, age: age, gender: gender, email: email, mobile: mobile, address:address}
  Dashboard.create(newDashboard, function(err, dashboard){
    if (err) {
      console.log(err);
    } else {
      console.log(dashboard);
    }
  });
});

//Login Routes
app.get("/login", function(req, res){
  res.render("/login");
});

app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/",
    failureRedirect: "/login"
  }), function(req, res){

  });

//logout Routes
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

//Enquiry model
app.get("/enquiry", function(req, res){
  res.render("enquiry");
});

app.post("/enquiry", function(req, res){
  Enquiry.create(req.body.enquiry, function(err, newEnquiry){
    if (err) {
      res.render("enquiry");
    } else {
      res.redirect("/");
    }
  });
});

//Dashboard Module
app.get("/dashboard", function(req, res){
  var cust = (req.user.username).toString();
  console.log(cust);
  Dashboard.find({}, function(err, dashboard){
    if (err) {
      console.log(err);
    } else {
      // var dash = JSON.parse(dashboard);
      // console.log(dashboard);
      res.render("dashboard", {dashboard: dashboard});
    }
  })

});

//PORT
app.listen(3000, function(){
  console.log("Serving app on port 3000");
});
