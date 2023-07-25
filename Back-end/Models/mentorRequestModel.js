const mongoose = require("mongoose");
// const Profile = require("../Models/profileModel");

const requestSchema = new mongoose.Schema(
  {
    title: {
        type: String, trim: true,
        required: [true, "Title is required"],
    },
    description: {
        type: String, trim: true,
        required: [true, 'Description is required'],
    },
    helpWith: [{type: String}],
    requirements: [{type: String}],
    haveBgWith: [{type: String}],
    lookingJob: { type: Boolean, default: false },
    location: {
        type: String, trim: true,
        lowercase: true,
        required: [true, 'Location required']
    },
    paid: {
        isPaid: {type: Boolean, default: false},
        amount: {type: Number, default: 0},
        currency: {type: String, default: "EGP"}
    },
    experience: {type: Number, default: 0},
    duration: {
      type: Number,
      required: [true, 'Duration in days required']
  },
    progress:{
      type:String,
      enum:["open", "in progress", "close"],
      default:"open"
  },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    applicants: [{
      type: mongoose.Schema.Types.ObjectId,
    }]
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = { Request };
