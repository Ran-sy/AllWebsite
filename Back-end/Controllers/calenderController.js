const opportunitys = require("../Models/opportunityModel");
const request = require("../Models/mentorRequestModel");

exports.getProfileCalendar = (req, res) => {
  const role = req.user.role;
  const opportunity =
    "mentor" == role
      ? opportunitys.find({ owner: req.user._id })
      : request.find({ mentee: req.user._id });
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  const unavailableDays = opportunitys.duration;

  const calendarData = {
    year,
    month,
    monthName,
    daysInMonth,
    unavailableDays,
  };

  res.statuse(200).send(calendarData);
};
