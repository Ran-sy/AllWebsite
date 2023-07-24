const fs = require("fs");
const path = require('path')
const User = require('../Models/userModel')

const uploadCV = async (req, res) => {
  const userId = req.params.id;

  const cvPath = req.file.path;

  try {
    
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    user.cvPath = cvPath; 
    await user.save();

    res.send("CV uploaded successfully");
  } catch (error) {
    console.log("Error uploading CV:", error);
    res.status(500).send("Internal Server Error");
  }
};


//////////////////////////////////////////////////////////////
// Controller function to handle CV download
const downloadcv = async (req, res) => {
  const menteeName = req.params.name;

  try {
    const user = await User.findOne({ name: menteeName });

    if (!user) {
      res.status(404).send("CV not found");
      return;
    }
    console.log("CV Path:", user.cvPath); // Check the value of cvPath

    if (!user.cvPath) {
      res.status(404).send("CV not found");
      return;
    }
    res.download(user.cvPath);
  } catch (error) {
    console.log("Error retrieving CV:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  uploadCV,
  downloadcv,
};