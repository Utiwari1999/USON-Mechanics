// this file has appointment Schema
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var AppointmentSchema = new mongoose.Schema({
  username: String,
  city: String,
  service_center: String,
  date: String,
  pickup_time: String,
  dropoff_time: String,
  repair_parts: String
});

AppointmentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Appointment", AppointmentSchema);
