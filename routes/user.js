const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const catchAsync = require("../utilities/catchAsync");
const usersCtrlr = require("../controllers/users-ctrlr");

router
  .route("/register")
  .get(usersCtrlr.renderRegisterForm)
  .post(catchAsync(usersCtrlr.postRegisterForm));

router
  .route("/login")
  .get(usersCtrlr.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    usersCtrlr.postLoginForm
  );

router.get("/logout", usersCtrlr.logout);

module.exports = router;
