const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signup, renderSignupForm, renderLoginForm, login, logout } = require("../controllers/users.js");

router.route("/signup")
//Signup form page
.get(renderSignupForm)
//Signup post page
.post(
  wrapAsync(signup),
);

router.route("/login")
//Login Get route
.get(renderLoginForm)
//User Login Post route
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login,
);


//User logout page
router.get("/logout", logout);

module.exports = router;
