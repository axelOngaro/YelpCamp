const express = require("express");
const router = express.Router({ mergeParams: true });

//Utilities
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");

//Models
const Campground = require("../models/campground");
const Review = require("../models/review");

//Joi schema
const { reviewSchema } = require("../schemas.js");

//Validation middleware
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

//Routes
router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    console.log(review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created new review");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,

  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
