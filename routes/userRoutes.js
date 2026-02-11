const express = require("express");
const {
  getUserController,
  updateUserController,
  changePassWordController,
  updatePasswordController,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

//routes
//get all users || GET
router.get("/getUser", authMiddleware, getUserController);
router.put("/updateUser", authMiddleware, updateUserController);
router.post("/change-password", authMiddleware, changePassWordController);
router.put("/update-password", authMiddleware, updatePasswordController);

module.exports = router;
