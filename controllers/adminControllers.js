const userModel = require("../models/userModel");
const foodModel = require("../models/foodModel");
//get all users
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).send({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all users API",
    });
  }
};
//get all vendor
const getAllVendorController = async (req, res) => {
  try {
    const vendors = await userModel
      .find({ userType: "vendor" })
      .select("-password");
    res.status(200).send({
      success: true,
      totalVendor: vendors.length,
      vendors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all Vendor API",
    });
  }
};
//get all clients
const getAllClientsController = async (req, res) => {
  try {
    const clients = await userModel
      .find({ userType: "client" })
      .select("-password");
    res.status(200).send({
      success: true,
      totalClient: clients.length,
      clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all client API",
    });
  }
};
//get all food
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel
      .find()
      .populate("vendor", "userName email")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      total: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllFood API",
    });
  }
};
//delete user
const deleteClientController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete User API",
    });
  }
};
// delete Vendor (and their foods)
const deleteVendorController = async (req, res) => {
  try {
    const vendor = await userModel.findOne({
      _id: req.params.id,
      userType: "vendor",
    });
    //validation
    if (!vendor) {
      return res.status(404).send({
        success: false,
        message: "Vendor not found",
      });
    }
    // Delete all foods of this vendor
    await foodModel.deleteMany({ vendor: vendor._id });
    // Delete vendor
    await userModel.findByIdAndDelete(vendor._id);

    res.status(200).send({
      success: true,
      message: "Vendor and their foods deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Vendor API",
      error,
    });
  }
};
module.exports = {
  getAllUsersController,
  getAllVendorController,
  getAllClientsController,
  getAllFoodController,
  deleteClientController,
  deleteVendorController,
};
