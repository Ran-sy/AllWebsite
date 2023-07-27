const { Request } = require("../Models/mentorRequestModel");
const Opportunity = require("../Models/opportunityModel");
const Profile = require("../Models/ProfileModel");
 
const acceptRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id)
      .populate("owner acceptedBy")

    if (!request) return res.status(404).send("Unable to find request");
    if (request.progress === "in progress")
      return res.status(400).send("This request is already in progress");
    else if (request.progress === "closed")
      return res.status(400).send("This request is already closed");
    const mentor = await Profile.findOne({ user: req.user.id });
    const mentee = await Profile.findOne({ user: request.owner });
    // console.log("mentor", mentor,"mentee", mentee)
    if (!mentor || !mentee) return res.status(400).send("no user found");
    mentor.dealtWith = mentor.dealtWith.concat(req.user.id);
    mentee.dealtWith = mentee.dealtWith.concat(request.owner);
    const from = new Date()
    const today = from
    const to = new Date(new Date().setDate(new Date().getDate()+(request.duration || 0)))
    mentor.busyDays.forEach(busy=>{
      if (today >= busy.from && today <=busy.to)
        throw new Error("can't accept the one request while busy with another, mentor is busy! ")
    })
    mentee.busyDays.forEach(busy=>{
      if (today >= busy.from && today <=busy.to)
        throw new Error("can't accept the one request while busy with another, mentee is busy! ")
    })

    mentor.busyDays = mentor.busyDays.concat({ from, to })
    mentee.busyDays = mentee.busyDays.concat({ from, to })
    console.log(`busyDays: ${from, "..." , to}`)
    request.progress = "in progress";
    request.acceptedBy = req.user.id;

    await request.save();
    await mentor.save();
    await mentee.save();
    console.log(request);
    res.status(200).send(request);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const acceptOpp = async (req, res) => {
  try {
    const id = req.params.id;
    const opp = await Opportunity.findById(id)
      .populate("owner acceptedBy")
    if (!opp) return res.status(404).send("Unable to find opportunity");
    if (opp.progress === "in progress")
      return res.status(400).send("This opportunity is already in progress");
    else if (opp.progress === "closed")
      return res.status(400).send("This opportunity is already closed");
    const mentee = await Profile.findOne({ user: req.user.id });
    const mentor = await Profile.findOne({ user: opp.owner });
    // console.log("mentor", mentor,"mentee", mentee)
    if (!mentor || !mentee) return res.status(400).send("no user found");
    mentor.dealtWith = mentor.dealtWith.concat(req.user.id);
    mentee.dealtWith = mentee.dealtWith.concat(opp.owner);
    const from = new Date()
    const today = from
    const to = new Date(new Date().setDate(new Date().getDate()+(opp.duration || 0)))
    mentor.busyDays.forEach(busy=>{
      console.log(`from: ${busy.from}, today: ${today}, to: ${busy.to}`)
      if (today >= busy.from && today <=busy.to)
        throw new Error("can't accept the one opportunity while busy with another, mentor is busy! ")
    })
    mentee.busyDays.forEach(busy=>{
      console.log(`from: ${busy.from}, today: ${today}, to: ${busy.to}`)
      if (today >= busy.from && today <=busy.to)
        throw new Error("can't accept the one opportunity while busy with another, mentee is busy! ")
    })
    mentor.busyDays = mentor.busyDays.concat({ from, to })
    mentee.busyDays = mentee.busyDays.concat({ from, to })
    console.log(`busyDays: ${from, "..." , to}`)
    opp.progress = "in progress";
    opp.acceptedBy = req.user.id;
    await opp.save();
    await mentor.save();
    await mentee.save();
    res.status(200).send(opp);
  } catch (e) {
    res.status(500).send(e.message);
  }
};


module.exports = { acceptRequest, acceptOpp };