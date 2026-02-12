import express from "express";
import { tutorController } from "./tutor.controller";
import authentication from "../../middleware/authentication";

const router = express.Router();

// Get all tutor ✔✔✔
router.get("/all-tutor", tutorController.getAllTutor);

// Get a single tutor by id ✔✔✔
router.get("/tutor-profile/:id", tutorController.getASingleTutorById);

// Get tutor profile by user id ✔✔✔
router.get(
  "/user/:id",
  authentication("TUTOR"),
  tutorController.getTutorProfileByUserId,
);

// Update tutor profile by id ✔✔✔
router.patch(
  "/tutor-profile/update/:id",
  authentication("TUTOR"),
  tutorController.updateTutorProfileById,
);

// Get all booking by tutor Id ✔✔✔
router.get(
  "/all-bookings/:id",
  authentication("TUTOR"),
  tutorController.getAllBookingByTutorId,
);

// Get all reviews ✔✔✔
router.get(
  "/all-reviews/:id",
  authentication("TUTOR"),
  tutorController.getAllReviewsByTutorId,
);

// Get tutors availability ✔✔✔
router.get(
  "/availability/:id",
  authentication("TUTOR"),
  tutorController.getTutorAvailability,
);

// Delete tutors availability ✔✔✔
router.delete(
  "/delete-availability/:id",
  authentication("TUTOR"),
  tutorController.deleteTutorAvailability,
);

// Set tutors availability ✔✔✔
router.post(
  "/tutor-availability",
  authentication("TUTOR"),
  tutorController.setTutorAvailability,
);

export const tutorRouter = router;
