const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  make: String,
  prodYear: Number,
  features: { AC: Boolean, PowerSteering: Boolean },
  date: Date,
  richText: String,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
