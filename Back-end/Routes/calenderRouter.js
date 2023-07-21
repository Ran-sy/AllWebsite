const express = require("express");
const router = express.Router();
const calendarController = require("../Controllers/calenderController");
const auth = require("../middleware/auth");

router.get("/calendar", auth, calendarController.getMentorCalendar);

router.get("/", auth, calendarController.getMenteeCalendar);

module.exports = router;
