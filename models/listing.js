const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");
const { type } = require("../schema");
const { string } = require("joi");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url:String,
    filename:String

  },
  price: {
    type: Number,
    min: [0, "Price cannot be negative"],
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  category:{
    type:String,
    enum:["Rooms","Iconinc Cities","Mountains","Castles","Amazing Pools","Camping","Farms","Arctic"]
  }
});
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
