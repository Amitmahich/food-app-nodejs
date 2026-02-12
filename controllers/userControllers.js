const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//Get user info
const getUserController = async (req, res) => {
  try {
    const userId = req.user.id; // yaha use hua jo apn ne middleware me req.user=decoded kiya tha

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "User data found",
      userId,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
    });
  }
};
//Update user
const updateUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    //find user
    const user = await userModel.findById(userId);
    //validate user
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //update user details
    const { userName, address, phone } = req.body || {};
    //validate request body
    if (!userName && !address && !phone) {
      return res.status(400).send({
        success: true,
        message: "Please Provide at least one Field ",
      });
    }
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};
//change password
const changePassWordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body || {}; //matalb body me kuch diya hi nhi
    //validation
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: true,
        message: "Please Provide All Fields",
      });
    }
    const user_id = req.user.id;
    //user find
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //comparing old password with real old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: true,
        message: "Old Password Incorrect",
      });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Change Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in change password API",
    });
  }
};
//update password
const updatePasswordController = async (req, res) => {
  try {
    const { newPassword } = req.body || {};
    // validation
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "New password is required!",
      });
    }
    // find logged-in user
    const user_id = req.user.id;
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // prevent same password reuse
    const isSame = await bcrypt.compare(newPassword, user.password);
    console.log("isSame:", isSame);
    if (isSame) {
      return res.status(400).send({
        success: false,
        message: "New password cannot be same as old password",
      });
    }
    //
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update password API",
    });
  }
};
// delete account
const deleteAccountController = async (req, res) => {
  try {
    const { password } = req.body || {};
    //validation
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required!",
      });
    }
    //find user
    const user_id = req.user.id;
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    // verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: true,
        message: "Wrong password!",
      });
    }
    //delete
    await user.deleteOne();
    res.status(200).send({
      success: true,
      message: "Account deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete account API",
    });
  }
};
// logout
const logoutController = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in logout API",
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  changePassWordController,
  updatePasswordController,
  deleteAccountController,
  logoutController,
};
