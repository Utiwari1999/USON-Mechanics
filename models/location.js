// this file has location details Schema
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var LocationSchema = new mongoose.Schema({
  username: String,
  city: String,
  state: String,
  country: String
});

LocationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Location", LocationSchema);
