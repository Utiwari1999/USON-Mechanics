var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var VehicleSchema = new mongoose.Schema({
  owner_name: String,
  car_company: String,
  model_name: String,
  color: String,
  delivery_date: String,
  vehicle_plate_no: String,
  insurance_type: String,
  insurance_expiry: String,
  engine_no: String,
  dealer_name: String,
  dealer_Address: String
});

VehicleSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Vehicle", VehicleSchema);
