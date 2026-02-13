const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addToCartController,
  getMyCartController,
  updateQuantityController,
  removeFoodController,
} = require("../controllers/cartControllers");
const router = express.Router();
//add to cart
router.post("/add-to-cart", authMiddleware, addToCartController);
//get my cart
router.get("/get-cart", authMiddleware, getMyCartController);
//update quantity
router.put("/update-quantity", authMiddleware, updateQuantityController);
//remove food from cart
router.delete("/delete-food", authMiddleware, removeFoodController);

module.exports = router;
