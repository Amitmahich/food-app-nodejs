const mongoose = require("mongoose");

//food item schema(for nested schema) esse "Item Schema Reusable" bn gya
const foodItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false },
);

//main cart schema ye hi hai
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    /* this is a simple way of writing model ( without nested schema )
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        },
      ],
    */
    // using nested schema
    items: [foodItemSchema],
  },
  { timestamps: true },
);
module.exports = mongoose.model("Cart", cartSchema);
