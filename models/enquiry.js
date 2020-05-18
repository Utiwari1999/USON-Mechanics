// this file has enquiry Schema
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: String,
  message: String,
  created: {type: Date, default: Date.now}
});

EnquirySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Enquiry", EnquirySchema);
