const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// POST: Submit new registration
router.post('/register', async (req, res) => {
  try {
    const { name, tower, flatNo, phone, gender, age, residentType, events } = req.body;
    const cleanPhone = phone.trim();

    let formattedActivities = {};
    
    // FIX: Ensure 'events' is always treated as an array, even if only 1 is selected
    if (events) {
      const eventsArray = Array.isArray(events) ? events : [events];
      
      eventsArray.forEach((event, index) => {
        const num = index + 1; // 1, 2, 3...
        if (num <= 6) { // Safety check to not exceed 6 activities
          formattedActivities[`activity${num}`] = event;
          formattedActivities[`activity${num}_details`] = req.body[`details_${event}`] || '';
          formattedActivities[`activity${num}_duration`] = req.body[`duration_${event}`] || null;
        }
      });
    }

    const newRegistration = new Registration({
      name, tower, flatNo, phone: cleanPhone, gender, age, residentType, 
      status: 'approved',
      ...formattedActivities
    });

    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful', data: newRegistration });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// GET: Fetch ALL registrations for a phone number
router.get('/status/:phone', async (req, res) => {
  try {
    const cleanPhone = req.params.phone.trim();
    const users = await Registration.find({ phone: cleanPhone });
    
    if (!users || users.length === 0) {
      return res.status(404).json({ status: 'not_found' });
    }

    res.json({ status: 'found', data: users });
  } catch (error) {
    res.status(500).json({ message: 'Server error while checking status' });
  }
});

module.exports = router;