const express = require("express");
const {
  getUserController,
  updateUserController,
  changePassWordController,
  updatePasswordController,
  deleteAccountController,
  logoutController,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const router = express.Router();

//routes
//get all users || GET
router.get("/get-User", authMiddleware, getUserController);
router.put("/update-User", authMiddleware, updateUserController);
router.post("/change-password", authMiddleware, changePassWordController);
router.put("/update-password", authMiddleware, updatePasswordController);
router.delete("/delete-account", authMiddleware, deleteAccountController);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
