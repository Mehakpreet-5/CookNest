
// adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// User data
router.get('/admin/users', async (req, res) => {
    try {
      // Fetch users from the database
      const users = await User.find({}, 'username email role'); 
      res.json(users); 
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.delete('/admin/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await User.findByIdAndDelete(userId);
  
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;