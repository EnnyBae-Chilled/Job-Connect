const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    const userCollectionName = `user_${newUser._id}`;
    await mongoose.connection.createCollection(userCollectionName);

    res.status(201).json({
      message: "User registered and collection created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// router.post('/api/user-data' , async (req, res) => {
//     const { userId, data } = req.body;

//     try {
//       const userCollection = mongoose.connection.collection(`user_${userId}`);
//       await userCollection.insertOne(data);

//       res.status(201).json({ message: 'Data added successfully' });
//     } catch (err) {
//       res.status(500).json({ message: 'Failed to add data' });
//     }
//   });

router.post("/user-details", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "We are having a hard time getting your details, try uploading your resumeand signing in again" });

    const { username, email, resume } = user;

    res.status(200).json({
      message: "User details fetched successfully.",
      user: { username, email, resume },
    });
  } catch (err) {
    console.error("Fetch error:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching user details." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'defaultsecret123', {
      expiresIn: "1d",
    });
    
    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
