const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewsCtrlr = require("../controllers/reviews-ctrlr");

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
router.post("/", isLoggedIn, validateReview, catchAsync(reviewsCtrlr.createReview));

router.delete("/:reviewId", isLoggedIn, catchAsync(reviewsCtrlr.deleteReview));

module.exports = router;
