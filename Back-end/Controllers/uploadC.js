// const fs = require("fs");
// const path = require('path')
// const User = require('../Models/userModel')
// const Profile = require("../Models/ProfileModel")
// const upload =require('../middleware/upload')

// const uploadFile = async (req, res, fileType) => {
//   const userId = req.params.id;

//   const filePath = req.file.path;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(404).send("User not found");
//       return;
//     }

//     if (fileType === 'cv') {
//       user.cvPath = filePath;
//     } else if (fileType === 'avatar') {
//       Profile.avatarPath = filePath;
//     }

//     await user.save();

//     res.send(`${fileType.toUpperCase()} uploaded successfully`);
//   } catch (error) {
//     console.log(`Error uploading ${fileType}:`, error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// // Endpoint for uploading CV
// const uploadCV = async (req, res) => {
//   await uploadFile(req, res, 'cv');
// };

// // Endpoint for uploading Avatar
// const uploadAvatar = async (req, res) => {
//   await uploadFile(req, res, 'avatar');
// };

// module.exports = {
//   uploadCV,
//   uploadAvatar
// };
