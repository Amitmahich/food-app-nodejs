const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Food description is required!"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required!"],
      min: 0,
    },
    category: {
      type: String,
      enum: ["veg", "non-veg", "drinks", "dessert"],
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Food", foodSchema);
