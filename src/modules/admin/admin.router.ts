import express from "express";
import { adminController } from "./admin.controller";
import authentication from "../../middleware/authentication";

const router = express.Router();

// Get all category ✔✔✔
router.get("/all-category", adminController.allCategory);

// View all bookings ✔✔✔
router.get(
  "/all-bookings",
  authentication("ADMIN"),
  adminController.getAllBookings,
);

// View all users ✔✔✔
router.get("/all-users", authentication("ADMIN"), adminController.getAllUsers);

// Update user status by id ✔✔✔
router.patch(
  "/user-update/:id",
  authentication("ADMIN"),
  adminController.updateUserStatusById,
);

// Delete Category ✔✔✔
router.delete(
  "/delete-category/:id",
  authentication("ADMIN"),
  adminController.deleteCategory,
);

// Add a new category ✔✔✔
router.post(
  "/add-category",
  authentication("ADMIN"),
  adminController.addNewCategory,
);

// Update category ✔✔✔
router.patch(
  "/update-category/:id",
  authentication("ADMIN"),
  adminController.updateCategory,
);

export const adminRouter = router;
