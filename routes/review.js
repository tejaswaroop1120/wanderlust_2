const express = require("express");
const router = express.Router({ mergeParams: true });

//For Error Handling
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

//For Schema validations
// const { listingSchema, reviewSchema } = require("../schema.js");

//Database operations
const mongoose = require("mongoose");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


const { validateReview, isLoggedin, isReviewAuthor }= require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reviews.js");


//Reviews Route
//Reviews POST request
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(createReview),
);

//Reviews Delete Route
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(destroyReview),
);

module.exports = router;
