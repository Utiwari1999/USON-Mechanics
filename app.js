var express = require("express");
var app = express();
const request = require('request');
var ip_data ='125.19.12.216';

app.use( express.static( "public" ));
app.get("/", function(req, res){
  res.render("index.ejs");
  // res.send("This is the main page");
});

app.get("/ip", function(req, res){
  request("http://api.ipstack.com/check?access_key=e93a0af9a29cc5c42ce47d86a479d92a", function(error, reponse, body){
    var data = JSON.parse(body);
    ip_data=data["ip"];
    // console.log(ip_data);
    // res.send("This is your ip address");
    res.redirect("/location");
  });

});

app.get("/login", function(req, res){
  res.render("login.ejs");
})

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

app.listen(3000, function(){
  console.log("Serving app on port 3000");
});
