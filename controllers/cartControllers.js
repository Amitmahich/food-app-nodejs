const mongoose = require("mongoose");
const cartModel = require("../models/cartModel");
const foodModel = require("../models/foodModel");
//add to cart
const addToCartController = async (req, res) => {
  try {
    const { food_id, quantity } = req.body || {};
    //food_id validation
    if (!food_id) {
      return res.status(400).send({
        success: false,
        message: "Food id is required!",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(food_id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid food id format",
      });
    }
    //if food exists in Food document
    const food = await foodModel.findById(food_id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found!",
      });
    }
    const user_id = req.user.id;
    //finding cart for user if exist
    let cart = await cartModel.findOne({ user: user_id });
    if (!cart) {
      // create new cart
      cart = await cartModel.create({
        user: user_id,
        items: [{ food: food_id, quantity: quantity || 1 }],
      });
    } else {
      //cart exist kre tb
      //cart me wo food exist krta hai kya
      const existingFood = cart.items.find(
        (item) => item.food.toString() === food_id,
      );
      //agar exist krta hai toh
      if (existingFood) {
        existingFood.quantity += quantity || 1;
      } else {
        //item ko add kro
        cart.items.push({
          food: food_id,
          quantity: quantity || 1,
        });
      }
      await cart.save();
    }
    res.status(200).send({
      success: true,
      message: "Item added to cart!",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Add to cart API",
    });
  }
};
//get my cart
const getMyCartController = async (req, res) => {
  try {
    const user_id = req.user.id;
    const cart = await cartModel
      .findOne({ user: user_id })
      .populate("items.food", " title price image category");
    if (!cart) {
      return res.status(200).send({
        success: true,
        message: "Cart is empty!",
        cart: { items: [] },
      });
    }
    res.status(200).send({
      success: true,
      totalItems: cart.items.length,
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get cart API",
    });
  }
};
//update quantity
const updateQuantityController = async (req, res) => {
  try {
    const { food_id, quantity } = req.body || {};
    //validation
    if (!food_id || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Food_id and Quantity is required!",
      });
    }
    if (quantity < 1) {
      return res.status(400).send({
        success: false,
        message: "Quantity must be at least 1",
      });
    }
    const user_id = req.user.id;
    const cart = await cartModel.findOne({ user: user_id });
    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart not found!",
      });
    }
    const item = cart.items.find((item) => item.food.toString() === food_id);
    if (!item) {
      return res.status(404).send({
        success: false,
        message: "Item not found in cart!",
      });
    }
    item.quantity = quantity;
    await cart.save();

    res.status(200).send({
      success: true,
      message: "Quantity updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Update cart controller",
    });
  }
};
const removeFoodController = async (req, res) => {
  try {
    const { food_id } = req.body || {};
    if (!food_id) {
      return res.status(400).send({
        success: false,
        message: "Food id is required!",
      });
    }
    const user_id = req.user.id;
    const cart = await cartModel.findOne({ user: user_id });
    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "Cart not found!",
      });
    }
    const foodExists = cart.items.some(
      (item) => item.food.toString() === food_id,
    );
    if (!foodExists) {
      return res.status(404).send({
        success: true,
        message: "Food not found in cart!",
      });
    }
    //remove item from cart using filter
    cart.items = cart.items.filter((item) => item.food.toString() !== food_id);
    await cart.save();
    res.status(200).send({
      success: true,
      message: "Food deleted successfully",
      cart,
    });
  } catch (error) {
    (console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in Remove food API",
      }));
  }
};
module.exports = {
  addToCartController,
  getMyCartController,
  updateQuantityController,
  removeFoodController,
};
