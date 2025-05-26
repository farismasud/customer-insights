const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  number: Number,
  nameOfLocation: String,
  date: String,
  loginHour: String,
  name: String,
  age: Number,
  gender: String,
  email: String,
  noTelp: String,
  brandDevice: String,
  digitalInterest: String,
  locationType: String
});

module.exports = mongoose.model('Customer', customerSchema);