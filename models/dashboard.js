var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var DashboardSchema = new mongoose.Schema({
  username: String,
  age: Number,
  gender: String,
  email: String,
  mobile: Number,
  address: String
});

DashboardSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Dashboard", DashboardSchema);
