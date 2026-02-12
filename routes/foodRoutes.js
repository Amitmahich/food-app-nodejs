const express = require("express");
const {
  addFoodController,
  getAllFoodController,
  getSingleFoodController,
  getMyFoodController,
  updateFoodController,
  deleteFoodController,
} = require("../controllers/foodControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const router = express.Router();

//add food
router.post(
  "/add-food",
  authMiddleware,
  authorizeRoles(["vendor", "admin"]),
  addFoodController,
);
//get all foods
router.get("/get-food", getAllFoodController);
//get single food
router.get("/get-food/:id", getSingleFoodController);
//get my foods
router.get(
  "/get-my-foods",
  authMiddleware,
  authorizeRoles(["vendor", "admin"]),
  getMyFoodController,
);
//update food
router.put(
  "/update-food/:id",
  authMiddleware,
  authorizeRoles(["vendor", "admin"]),
  updateFoodController,
);
router.delete(
  "/delete-food/:id",
  authMiddleware,
  authorizeRoles(["vendor", "admin"]),
  deleteFoodController,
);
module.exports = router;
