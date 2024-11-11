const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Otp = require('../models/otp-model'); // Ensure the path is correct

dotenv.config();
const router = express.Router();

const sendEmail = async (req, res) => {
  const { email } = req.body; // Extract email from the request body
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

  const emailProvider = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const receiver = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    // Save the OTP in the database
    await Otp.create({ email, otp });
    
    await emailProvider.sendMail(receiver);
    res.status(200).json({ message: 'OTP sent successfully', otp }); // Optionally return the OTP for testing
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

router.post('/sendEmail', sendEmail);

module.exports = router;
