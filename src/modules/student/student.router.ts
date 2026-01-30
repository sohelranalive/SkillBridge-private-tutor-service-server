import express from "express";
import { studentController } from "./student.controller";
import authentication from "../../middleware/authentication";

const router = express.Router();

// Create booking
router.post("/booking", studentController.createBooking);

// Get all booking
router.get(
  "/all-booking",
  authentication("STUDENT", "ADMIN"),
  studentController.getAllBooking,
);

// // Get a single tutor by id
// router.get("/tutor-profile/:id", tutorController.getASingleTutorByID);

// // Update tutor profile
// router.patch(
//   "/tutor-profile/update/:id",
//   tutorController.updateTutorProfileByID,
// );

export const studentRouter = router;
