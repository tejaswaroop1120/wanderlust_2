const express = require("express");
const router = express.Router();

//Database operations
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

//For Error Handling
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

//For Schema validations
const { listingSchema, reviewSchema } = require("../schema.js");

// User login (Authentication)
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const { findById } = require("../models/user.js");

//Controllers
const {
  index,
  renderNewForm,
  showListing,
  createListing,
  updateListing,
  renderEditForm,
  destroyListing,
} = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  //Index Route
  .get(wrapAsync(index))
  //Create Route
  .post(isLoggedin,validateListing,upload.single("listing[image]"), wrapAsync(createListing));

//New Route
router.get("/new", isLoggedin, renderNewForm);

router
  .route("/:id")
  //Show Route
  .get(wrapAsync(showListing))
  //Update Route
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updateListing),
  )
  //Delete Route
  .delete(isLoggedin, isOwner, wrapAsync(destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(renderEditForm));

module.exports = router;
