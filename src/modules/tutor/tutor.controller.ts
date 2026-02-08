import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { TutorProfile } from "../../../generated/prisma/client";
import paginationHelper from "../../helpers/paginationHelper";

// Get all tutor ✔✔✔
const getAllTutor = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;

    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
          ? false
          : undefined
      : undefined;

    const price = req.query.price as number | undefined;

    const ratings = req.query.ratings as number | undefined;

    const category = req.query.category as string | undefined;

    const options = paginationHelper(req.query);
    const { page, limit, skip, sortBy, sortOrder } = options;

    const result = await tutorService.getAllTutor({
      search,
      isFeatured,
      price,
      category,
      ratings,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single tutor by id ✔✔✔
const getASingleTutorByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await tutorService.getASingleTutorByID(id as string);

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get tutor by user id ✔✔✔
const getTutorByUserId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await tutorService.getTutorByUserId(id as string);

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
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
  getTutorByUserId,
  updateTutorProfileByID,
};
