import express from "express";
import { studentController } from "./student.controller";
import authentication from "../../middleware/authentication";

const router = express.Router();

// Create booking
router.post(
  "/booking",
  authentication("STUDENT"),
  studentController.createBooking,
);

// Get all booking by Id
router.get(
  "/all-booking/:id",
  authentication("STUDENT"),
  studentController.getAllBookingById,
);

// Get all booking
router.get(
  "/all-booking",
  authentication("STUDENT", "ADMIN"),
  studentController.getAllBooking,
);

export const studentRouter = router;
