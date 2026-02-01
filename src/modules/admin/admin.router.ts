import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

// view all bookings
router.get("/all-bookings", adminController.getAllBookings);

// update user status
router.patch("/user-update/:id", adminController.updateUserStatusById);

// add a new category
router.post("/add-category", adminController.addNewCategory);

// update category by id
router.post("/update-category/:id", adminController.addNewCategory);

export const adminRouter = router;
