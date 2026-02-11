import express, { Request, Response } from "express";
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

// tutors sessions
router.get(
  "/sessions",
  authentication("TUTOR"),
  tutorController.tutorSessionsById,
);

// Set availability
router.post(
  "/tutor-profile/availability",
  tutorController.setTutorAvailability,
);

export const tutorRouter = router;
