const mongoose = require('mongoose');

// Define the OTP schema
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '5m' } // OTP expires in 5 minutes
});

// Create the OTP model
const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
