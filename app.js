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
var Vehicle = require("./models/vehicle");
var Enquiry = require("./models/enquiry");
var Location = require("./models/location");
var Center = require("./models/center");
var Appointment = require("./models/appointment");

//encryting password
app.use(require("express-session")({
  secret: "kuch bhi likh do",
  resave: false,
  saveUninitialized: false
}));


//Connecting to mongodb server and storing ip_data
mongoose.connect("mongodb://localhost:27017/uson_mechanics2", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

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
    // console.log(data);
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
    var demo = data["ip"]["city"];
    console.log(typeof demo);
    if(demo != ''){
      var name = req.user.username;
      var city = data["ip"]["city"];
      var state = data["ip"]["region"];
      var country = data["ip"]["country_names"]["en"]
      var newLocation = {username: name, city: city, state: state, country: country};

      Location.findOne({username: name}, function(err, location){
        if (err) {
          console.log(err);
        }
        if (location) {
          console.log("This data has already been saved");
        } else {
          var location = new Location(newLocation);
          location.save(function(err, location){
            if (err) {
              console.log(err);
            }
            console.log("New location created");
            // res.redirect("/ip");
          });
        }
      });

      console.log(req.user.username);
      console.log(data["ip"]["city"]);
      console.log(data["ip"]["region"]);
      console.log(data["ip"]["country_names"]["en"]);
    }

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


//Enquiry model
app.get("/enquiry", function(req, res){
  res.render("enquiry");
});

app.post("/enquiry", function(req, res){
  console.log(req.body.name);
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var message = req.body.message;
  var newEnquiry = {name: name, email: email, phone: phone, address: address, message: message};
  Enquiry.create(newEnquiry, function(err, enquiry){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});





//saving location details
app.post("/save_location_details", function(req, res){
  console.log(req.user.username);
  // console.log(req);
});

//Dashboard Module
app.get("/dashboard", isLoggedIn, function(req, res){
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

//Car Details Module
app.get("/car_details", function(req, res){
  Dashboard.find({username: req.user.username}).populate("details").exec(function(err, details){
    if (err) {
      console.log(err);
    } else {
      if (typeof details[0].details[0] !== 'undefined' && details[0].details[0] !== null){
   // do stuff
        console.log(details);
        res.render("car_details", {carDetails: details});
      }
      else {
        console.log(details);
        res.render("car");
      }

    }
  });

});

app.post("/car_details", function(req, res){
  console.log(req.body.vehicle);
  Dashboard.find({username: req.user.username}, function(err, dashboard){
    if (err) {
      console.log(err);
    } else {
      console.log(dashboard);
      Vehicle.create(req.body.vehicle, function(err, vehicle){
        if (err) {
            console.log(err);;
        } else {
          console.log(vehicle);
          dashboard[0].details.push(vehicle);
          dashboard[0].save();
          res.redirect("/dashboard");
        }
      });
    }
  });

});


//book appointment Module
app.get("/book_appointment", isLoggedIn, function(req, res){
  var temp = "";
  var cent = [];
  Location.find({username: req.user.username}, function(err, location){
    if (err) {
      console.log(err);
    } else {
        temp = location[0].city;
    }
  });
  Center.find({}, function(err, center){
    if (err) {
      console.log(err);
    }else {
      for(var i=0; i<center.length; i++){
        if(center[i]["name"] === temp){
            console.log(center[i]);
            cent = center[i]
        }
      }
      res.render("book_appointment", {center: cent});
    }
  });
});

app.post("/book_appointment", function(req, res){
  console.log(req.user.username);
  var username = req.user.username;
  var service_center = req.body.service_center;
  var city = req.body.city;
  var date = req.body.date;
  var pickup_time = req.body.pickup_time;
  var dropoff_time = req.body.dropoff_time;
  var repair_parts = req.body.repair_parts;
  var newAppointment = {username: username, service_center: service_center, city: city, date: date, pickup_time: pickup_time, dropoff_time: dropoff_time, repair_parts: repair_parts};
  Appointment.create(newAppointment, function(err, enquiry){
    if (err) {
      console.log(err);
    } else {
      console.log("Appointment booked successfully");
      res.redirect("/dashboard");
    }
  });
});

// creating service center database
// app.get("/center_database", function(req, res){
//   var newCenter = {
//     name: "Gwalior",
//     city: [
//       "Perfect Car Care",
//       "Suzuki Service Center",
//       "Narayan Suzuki",
//       "Nexa Service Gwalior",
//       "Prem Suzuki"
//     ]
//   };
//   Center.create(newCenter, function(err, center){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Data written successfully");
//       res.send("Hi There");
//     }
//   });
// });

//displaying my bookings Route
app.get("/my_bookings", isLoggedIn, function(req, res){
  var booking = []
  var name = req.user.username.toString();
  Appointment.find({username: name}, function(err, appointment){
    if (err) {
      console.log(err);
    } else {
      console.log(req.user.username);
      // console.log(appointment);
      res.render("my_bookings", {appointment: appointment});
    }
  });

});


//check for insurance date validity
app.get("/insurance_check",isLoggedIn , function(req, res){
  var name = req.user.username.toString();
  Vehicle.find({owner_name: name}, function(err, vehicle){
    if (err) {
      console.log(err);
    } else {
      res.render("insurance_check", {vehicle: vehicle});
    }
  })
})


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

//PORT
app.listen(3000, function(){
  console.log("Serving app on port 3000");
});
