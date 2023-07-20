const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
const CLIENT_URL = "http://localhost:3000";
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google",

    { failureRedirect: "/login", successRedirect: CLIENT_URL }
  )
);
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google",

    { failureRedirect: "/login", successRedirect: CLIENT_URL }
  )
);
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile","email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
