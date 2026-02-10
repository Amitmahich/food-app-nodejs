const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone } = req.body;

    //validation
    if (!userName || !email || !password || !address || !phone) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //checking user already exist ?????
    const existing = await userModel.findOne({ email: email });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: "Email already registered , Please login",
      });
    }
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    user.password = undefined;
    res.status(201).send({
      success: true,
      message: "Successfully registered!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required!",
      });
    }
    //check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered, please sign up",
      });
    }
    //check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Email or Password!",
      });
    }

    //response me password ko hide krne ke liye
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login Successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
