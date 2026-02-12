const foodModel = require("../models/foodModel");
//add food
const addFoodController = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body || {};
    //validation
    if (!title || !description || !price || !category) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields!",
      });
    }
    //vendor id
    const vendor_id = req.user.id;
    //create food
    const food = await foodModel.create({
      title,
      description,
      price,
      category,
      image,
      vendor: vendor_id,
    });
    res.status(201).send({
      success: true,
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error in Add food API",
    });
  }
};
//get all foods
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel
      .find() //esse saare foods aa jayenge
      .populate("vendor", "email userName") //populate us vender ki id se uski email and userName le aayega(Type of join)
      .sort({ createdAt: -1 }); //for sorting newest first
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All food API",
    });
  }
};
//get single food
const getSingleFoodController = async (req, res) => {
  try {
    const food_id = req.params.id;
    const food = await foodModel.findById(food_id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food found successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error in Get single food API",
    });
  }
};
//get own foods
const getMyFoodController = async (req, res) => {
  try {
    const vendor_id = req.user.id;
    const foods = await foodModel.find({ vendor: vendor_id });
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get My food API",
    });
  }
};
module.exports = {
  addFoodController,
  getAllFoodController,
  getSingleFoodController,
  getMyFoodController,
};
