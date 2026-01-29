import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { TutorProfile } from "../../../generated/prisma/client";

// Get aLL tutor
const getAllTutor = async (req: Request, res: Response) => {
  const result = await tutorService.getAllTutor();

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

export const tutorController = {
  getAllTutor,
  getASingleTutorByID,
  updateTutorProfileByID,
};
