const router = require("express").Router();
const accepting = require("../Controllers/acceptingController");
const auth = require("../middleware/auth")
const { isMentee, isMentor } = require("../middleware/reqAndOpp")

router.patch("/accept/request", auth, isMentee,accepting.acceptRequest)
router.patch("/accept/opp", auth, isMentor, accepting.acceptOpp)

module.exports = router;