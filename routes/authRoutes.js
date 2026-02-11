const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");

const router = express.Router();

//routes
//register || POST
router.post("/register", registerController);

//login || POST
router.post("/login", loginController);

//forget passsword || POST


module.exports = router;
