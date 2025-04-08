const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (free tier)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema (for job preferences)
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  jobTitles: [String],
  jobLevel: String
});
const User = mongoose.model('User', userSchema);

// Save job preferences
app.post('/api/preferences', async (req, res) => {
  try {
    const { email, jobTitles, jobLevel } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { jobTitles, jobLevel },
      { upsert: true, new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch jobs from Adzuna (proxy to avoid CORS)
app.get('/api/jobs', async (req, res) => {
  try {
    const { title, location } = req.query;
    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&title=${title}`
    );
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));