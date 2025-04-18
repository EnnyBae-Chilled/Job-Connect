const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.post("/get-interview-tips", async (req, res) => {
  const { jobTitle } = req.body;

  if (!jobTitle) {
    return res.status(400).json({ error: "Job title is required" });
  }

  try {
    // Call the AI API (example with OpenAI's GPT-3)
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        model: "text-davinci-003", // Use the appropriate GPT model
        prompt: `Give me interview tips for a ${jobTitle}`,
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    // Return the AI-generated tips
    if (data.choices && data.choices[0].text) {
      const tips = data.choices[0].text
        .split("\n")
        .map((tip) => tip.trim())
        .filter((tip) => tip.length > 0);
      return res.json({ tips });
    } else {
      return res.status(500).json({ error: "Failed to fetch tips" });
    }
  } catch (error) {
    console.error("Error fetching tips from AI:", error);
    return res.status(500).json({ error: "Failed to fetch tips from AI" });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/extract", express.static(path.join(__dirname, "extract")));

app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
