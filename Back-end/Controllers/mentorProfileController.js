const Profile = require("../Models/profileModel");
const fs = require('fs');

const PostMentor = (req, res) => {
  let avatar = req.file ? req.file.fieldname : ""
  const avatarPath = req.file ? req.file.path : "";
  let mentor = new Profile({
    ...req.body,
    lookingFor: req.body.lookingFor ? req.body.lookingFor : "mentee",
    avatar,
    user: req.user._id,
  });
  mentor.updateRole(mentor);

  mentor
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      if (avatar) deleteUploadedAvatar(avatarPath)
      res.status(400).send(error.message);
    });
};

////////////////////////////////////////////////////////////////////////////////////
function deleteUploadedAvatar(avatarPath) {
  // avatarPath
  const filePath = avatarPath; // Specify the correct path to the avatar file

  if (!fs.existsSync(filePath)) {
    console.error('Avatar file does not exist');
    return;
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting avatar: ${err}`);
    } else {
      console.log('Avatar deleted successfully');
    }
  });
}

// Get

const GetMentors = async (req, res) => {
  try {
    const mentor = await Profile.find({ lookingFor: "mentee" }).populate({
      path: "user dealtWith",
      select: "-tokens",
    });
    res.status(200).send(mentor);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

/////////////////////////////////////////////////////////////////////////////////

const getById = async (req, res) => {
  try {
    const _id = req.params.id;
    const mentor = await Profile.findById(_id).populate(
      'user dealtWith'
    );
    if (!mentor) {
      res.status(404).send("UNABLE TO FIND Mentor");
    } else {
      res.status(200).send(mentor);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

/////////////////////////////////////////////////////////////////////////////////
// patch

const PatchMentor = async (req, res) => {
  try {
    const _id = req.params.id;
    const mentor = await Profile.findByIdAndUpdate(_id, {
      ...req.body,
      avatar: req.file ? req.file.filename : "",
    }, {
      new: true,
      runValidators: true,
    });
    if (!mentor) {
      return res.status(404).send("No Mentor Founded");
    }
    mentor.updateRole(mentor);
    res.status(200).send(mentor);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////

const DeleteMentor = async (req, res) => {
  try {
    const _id = req.params.id;
    const mentor = await Profile.findByIdAndDelete(_id);
    if (!mentor) {
      return res.status(404).send("UNABLE TO FIND Mentor");
    }
    res.status(200).send("mentor is deleted");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  PostMentor,
  DeleteMentor,
  PatchMentor,
  getById,
  GetMentors,
};
