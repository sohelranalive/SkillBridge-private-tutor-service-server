import { NextFunction, Request, Response } from "express";
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
const getASingleTutorById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await tutorService.getASingleTutorById(id as string);

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

// Get tutor profile by user id ✔✔✔
const getTutorProfileByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await tutorService.getTutorProfileByUserId(id as string);

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update tutor profile by id ✔✔✔
const updateTutorProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await tutorService.updateTutorProfileById(
      id as string,
      data,
    );

    res.status(200).json({
      message: "Data updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get all booking by tutor Id ✔✔✔
const getAllBookingByTutorId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await tutorService.getAllBookingByTutorId(id as string);

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Get all booking by tutor Id ✔✔✔
const getAllReviewsByTutorId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.params.id;

    const result = await tutorService.getAllReviewsByTutorId(tutorId as string);

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Get tutors availability ✔✔✔
const getTutorAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutorId = req.params.id;

    const result = await tutorService.getTutorAvailability(tutorId as string);

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Delete tutors availability ✔✔✔
const deleteTutorAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const availabilityId = req.params.id;

    const result = await tutorService.deleteTutorAvailability(
      availabilityId as string,
    );

    if (result == "Booking exists") {
      res.status(404).json({
        message: "Booking exits",
        data: result,
      });
    } else {
      res.status(204).json({
        message: "Data deleted successfully",
        data: result,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

// Set tutors availability ✔✔✔
const setTutorAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const result = await tutorService.setTutorAvailability(data);

    res.status(201).json({
      message: "Data created successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const tutorController = {
  getAllTutor,
  getASingleTutorById,
  getTutorProfileByUserId,
  updateTutorProfileById,
  getAllBookingByTutorId,
  getAllReviewsByTutorId,
  getTutorAvailability,
  deleteTutorAvailability,
  setTutorAvailability,
};
