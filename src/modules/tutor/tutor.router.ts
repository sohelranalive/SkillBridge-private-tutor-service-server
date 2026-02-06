import express, { Request, Response } from "express";
import { tutorController } from "./tutor.controller";
import authentication from "../../middleware/authentication";

const router = express.Router();

// Get all tutor
router.get("/all-tutor", tutorController.getAllTutor);

// Get a single tutor by id
router.get("/tutor-profile/:id", tutorController.getASingleTutorByID);

// Update tutor profile
router.patch(
  "/tutor-profile/update/:id",
  authentication("TUTOR"),
  tutorController.updateTutorProfileByID,
);

// Set availability
router.post(
  "/tutor-profile/availability",
  tutorController.setTutorAvailability,
);

// tutors sessions
router.get(
  "/sessions",
  authentication("TUTOR"),
  tutorController.tutorSessionsById,
);

export const tutorRouter = router;
