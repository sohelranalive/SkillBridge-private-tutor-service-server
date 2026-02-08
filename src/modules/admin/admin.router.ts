import express from "express";
import { adminController } from "./admin.controller";
import authentication from "../../middleware/authentication";

const router = express.Router();

// Get all category ✔✔✔
router.get("/all-category", adminController.allCategory);

// view all bookings
router.get(
  "/all-bookings",
  authentication("ADMIN"),
  adminController.getAllBookings,
);

// update user status
router.patch(
  "/user-update/:id",
  authentication("ADMIN"),
  adminController.updateUserStatusById,
);

// add a new category
router.post(
  "/add-category",
  authentication("ADMIN"),
  adminController.addNewCategory,
);

// update category by id
router.post(
  "/update-category/:id",
  authentication("ADMIN"),
  adminController.addNewCategory,
);

export const adminRouter = router;
