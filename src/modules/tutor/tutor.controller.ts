import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { TutorProfile } from "../../../generated/prisma/client";

// Get all tutors
const getAllTutor = async (req: Request, res: Response) => {
  const search = req.query.search as string | undefined;

  const isFeatured = req.query.isFeatured
    ? req.query.isFeatured === "true"
      ? true
      : req.query.isFeatured === "false"
        ? false
        : undefined
    : undefined;

  const subject = req.query.subject as string | undefined;

  const ratings = req.query.ratings as number | undefined;

  const price = req.query.price as number | undefined;

  const category = req.query.category as string | undefined;

  const result = await tutorService.getAllTutor({
    search,
    isFeatured,
    subject,
    ratings,
    price,
    category,
  });

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// Get a single tutor by id
const getASingleTutorByID = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await tutorService.getASingleTutorByID(id as string);

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// Update tutor profile
const updateTutorProfileByID = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await tutorService.updateTutorProfileByID(id as string, data);

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// Set tutors Availability
const setTutorAvailability = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await tutorService.setTutorAvailability(data);

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// tutors all sessions
const tutorSessionsById = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await tutorService.tutorSessionsById(userId as string);
  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

export const tutorController = {
  tutorSessionsById,
  setTutorAvailability,
  getAllTutor,
  getASingleTutorByID,
  updateTutorProfileByID,
};
