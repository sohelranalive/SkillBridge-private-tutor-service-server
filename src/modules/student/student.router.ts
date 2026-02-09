import express from "express";
import { studentController } from "./student.controller";
import authentication from "../../middleware/authentication";

const router = express.Router();

// Get all reviews ✔✔✔
router.get("/all-review", studentController.getAllReviews);

// Get booking with query ✔✔✔
router.get("/booking", authentication("STUDENT"), studentController.getBooking);

// Create booking ✔✔✔
router.post(
  "/create-booking",
  authentication("STUDENT"),
  studentController.createBooking,
);

// Get all booking by student Id ✔✔✔
router.get(
  "/all-booking/:id",
  authentication("STUDENT"),
  studentController.getAllBookingByStudentId,
);

// get all students
router.get("/all-students", studentController.getAllStudents);

export const studentRouter = router;
