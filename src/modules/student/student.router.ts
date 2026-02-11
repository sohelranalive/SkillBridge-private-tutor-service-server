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

// Get all reviews by student Id ✔✔✔
router.get(
  "/all-reviews/:id",
  authentication("STUDENT"),
  studentController.getAllReviewsByStudentId,
);

// Delete reviews ✔✔✔
router.delete(
  "/delete-review/:id",
  authentication("STUDENT"),
  studentController.deleteReview,
);

// Update reviews ✔✔✔
router.patch(
  "/update-review/:id",
  authentication("STUDENT"),
  studentController.updateReview,
);

// Write Review ✔✔✔
router.post(
  "/write-review",
  authentication("STUDENT"),
  studentController.writeReview,
);

export const studentRouter = router;
