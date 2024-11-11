

const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



// signup 
const signup =
async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Validate the incoming data if necessary
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  console.log(req.body)
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


  // Login Route
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Successful login
      res.status(200).json({ message: 'Login successful', user: { email: user.email, username: user.username  ,   isAdmin: user.isAdmin,  } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {signup, login}