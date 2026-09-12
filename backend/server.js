require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api', registrationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});