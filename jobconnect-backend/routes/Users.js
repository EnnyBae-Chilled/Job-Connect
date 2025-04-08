// routes/users.js
router.post('/preferences', authMiddleware, async (req, res) => {
    try {
      const { userId, jobTitles, jobLevel } = req.body;
      
      // Update user document with preferences
      const user = await User.findByIdAndUpdate(
        userId,
        { 
          jobPreferences: {
            titles: jobTitles,
            level: jobLevel
          }
        },
        { new: true }
      );
      
      res.status(200).json({ 
        message: "Preferences saved successfully",
        user 
      });
    } catch (error) {
      res.status(400).json({ 
        message: error.message 
      });
    }
  });