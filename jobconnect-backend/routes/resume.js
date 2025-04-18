const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/Users");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const textract = require("textract");

const app = express();
app.use(express.json());

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("resume"), async (req, res) => {
  const { userId } = req.body;

  if (!userId || !req.file) {
    return res
      .status(400)
      .json({ message: "User ID and resume file are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.resume = req.file.path; // Save path or filename
    await user.save();

    res
      .status(200)
      .json({ message: "Resume uploaded successfully.", resume: user.resume });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error during resume upload." });
  }
});
function extractData(text) {
  const result = {
    name: null,
    email: null,
    phone: null,
    skills: [],
  };

  // Regex for email and phone
  const emailMatch = text.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  const phoneMatch = text.match(/\+?\d[\d\s().-]{7,}/);

  if (emailMatch) result.email = emailMatch[0];
  if (phoneMatch) result.phone = phoneMatch[0];

  // Skills matching (expand as needed)
  const skillKeywords = ["python", "javascript", "react", "node", "sql", "aws"];
  const lowerText = text.toLowerCase();
  result.skills = skillKeywords.filter((skill) => lowerText.includes(skill));

  // Try naive name detection (can be improved)
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length > 0) result.name = lines[0]; // assuming name is first line

  return result;
}

// Route to extract details from resume path
router.post("/extract", async (req, res) => {
  const { resumePath } = req.body;

  if (!resumePath)
    return res.status(400).json({ error: "No resume path provided" });

  const filePath = path.join(__dirname, "uploads", path.basename(resumePath));

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Resume file not found" });
  }

  const ext = path.extname(filePath).toLowerCase();

  try {
    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      const extracted = extractData(data.text);
      return res.json(extracted);
    } else {
      textract.fromFileWithPath(filePath, (err, text) => {
        if (err)
          return res.status(500).json({ error: "Failed to extract resume" });
        const extracted = extractData(text);
        return res.json(extracted);
      });
    }
  } catch (error) {
    console.error("Resume parsing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
