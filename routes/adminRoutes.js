const express = require("express");
const router = express.Router();
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const {
  getAllUsersController,
  getAllVendorController,
  getAllClientsController,
  getAllFoodController,
  deleteClientController,
  deleteVendorController,
} = require("../controllers/adminControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

//get all users
router.get(
  "/get-users",
  authMiddleware,
  authorizeRoles(["admin"]),
  getAllUsersController,
);
//get all vendor
router.get(
  "/get-vendor",
  authMiddleware,
  authorizeRoles(["admin"]),
  getAllVendorController,
);
//get all client
router.get(
  "/get-client",
  authMiddleware,
  authorizeRoles(["admin"]),
  getAllClientsController,
);
//get all food
router.get(
  "/get-food",
  authMiddleware,
  authorizeRoles(["admin"]),
  getAllFoodController,
);
//delete client
router.delete(
  "/delete-client/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  deleteClientController,
);
//delete vendor
router.delete(
  "/delete-vendor/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  deleteVendorController,
);
module.exports = router;
