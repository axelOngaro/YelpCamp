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
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).joun(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//Routes
router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
