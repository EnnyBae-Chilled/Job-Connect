require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Define PORT here (crucial fix)
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => 
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);