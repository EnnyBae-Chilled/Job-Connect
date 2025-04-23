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
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDxzoE3guHO9bruZ0keoOXYFXmPxwXerZs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give me interview tips for a ${jobTitle}.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // Gemini returns a different structure than OpenAI
    if (data && data.candidates && data.candidates[0]?.content?.parts) {
      const rawTips = data.candidates[0].content.parts[0].text;
      const tips = rawTips
        .split("\n")
        .map((tip) => tip.trim())
        .filter((tip) => tip.length > 0);
      return res.json({ tips });
    } else {
      return res.status(500).json({ error: "Failed to fetch tips" });
    }
  } catch (error) {
    console.error("Error fetching tips from Gemini:", error);
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
