var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var DashboardSchema = new mongoose.Schema({
  username: String,
  age: Number,
  gender: String,
  email: String,
  mobile: Number,
  address: String,
  details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      'default': [
        owner_name="",
        car_company="",
        model_name="",
        color="",
        delivery_date="",
        vehicle_plate_no="",
        insurance_type="",
        insurance_expiry="",
        engine_no="",
        dealer_name="",
        dealer_Address="",
      ]
    }
  ]
});

DashboardSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Dashboard", DashboardSchema);
