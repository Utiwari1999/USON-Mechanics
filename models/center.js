var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var CenterSchema = new mongoose.Schema({
  name: String,
  city: [{
    type: String
  }]
});

CenterSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Center", CenterSchema);
