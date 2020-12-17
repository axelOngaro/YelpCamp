const express = require("express");
const router = express.Router();
const campgroundsCtrlr = require("../controllers/campgounds-ctrlr");
const catchAsync = require("../utilities/catchAsync");
const Campground = require("../models/campground");
const { isAuthor, isLoggedIn, validateCampground } = require("../middleware");

router
  .route("/")
  .get(catchAsync(campgroundsCtrlr.index))
  .post(isLoggedIn, validateCampground, catchAsync(campgroundsCtrlr.postNewForm));

router.get("/new", isLoggedIn, campgroundsCtrlr.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgroundsCtrlr.showCampgrounds))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsCtrlr.putEditForm))
  .delete(isLoggedIn, isAuthor, catchAsync(campgroundsCtrlr.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundsCtrlr.renderEditForm)
);

module.exports = router;
