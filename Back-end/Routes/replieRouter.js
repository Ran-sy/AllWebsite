const express = require("express");
const Replie = require("../Controllers/replieControler");

const auth = require("../middleware/auth");
const router = express.Router();
router.post("/comment/:mentorApplicationId", Replie.addReplie);
router.get("/comment/:mentorApplicationId", Replie.getReplie);
module.exports = router;
