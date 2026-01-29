import express, { Request, Response } from "express";
import { tutorController } from "./tutor.controller";

const router = express.Router();

// Get aLL tutor
router.get("/all-tutor", tutorController.getAllTutor);

// Get a single tutor by id
router.get("/tutor-profile/:id", tutorController.getASingleTutorByID);

// Update tutor profile
router.patch(
  "/tutor-profile/update/:id",
  tutorController.updateTutorProfileByID,
);

export const tutorRouter = router;
