const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tower: { type: String, required: true },
  flatNo: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  residentType: { type: String, required: true },
  status: { type: String, default: 'approved' }, 
  
  // Clean CSV Columns for up to 6 activities
  activity1: { type: String }, activity1_details: { type: String }, activity1_duration: { type: Number },
  activity2: { type: String }, activity2_details: { type: String }, activity2_duration: { type: Number },
  activity3: { type: String }, activity3_details: { type: String }, activity3_duration: { type: Number },
  activity4: { type: String }, activity4_details: { type: String }, activity4_duration: { type: Number },
  activity5: { type: String }, activity5_details: { type: String }, activity5_duration: { type: Number },
  activity6: { type: String }, activity6_details: { type: String }, activity6_duration: { type: Number },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);