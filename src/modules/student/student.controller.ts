import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";

// Get all reviews ✔✔✔
const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllReviews();

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

// Get booking with query ✔✔✔
const getBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student_id = req.query.studentId as string;
    const availability_id = req.query.availabilityId as string;
    const result = await studentService.getBooking({
      student_id,
      availability_id,
    });
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Create Booking ✔✔✔
const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const result = await studentService.createBooking(data);

    res.status(201).json({
      message: "Data creation successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Get all booking by student Id ✔✔✔
const getAllBookingByStudentId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await studentService.getAllBookingByStudentId(id as string);

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Get all reviews by student Id ✔✔✔
const getAllReviewsByStudentId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await studentService.getAllReviewsByStudentId(id as string);

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Delete Reviews ✔✔✔
const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await studentService.deleteReview(id as string);

    res.status(204).json({
      message: "Content deleted successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update Reviews ✔✔✔
const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await studentService.updateReview(id as string, data);

    res.status(200).json({
      message: "Reviews updated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Write Review ✔✔✔
const writeReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await studentService.writeReview(data);

    res.status(201).json({
      message: "Data creation successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const studentController = {
  getAllReviews,
  getBooking,
  createBooking,
  getAllBookingByStudentId,
  getAllReviewsByStudentId,
  deleteReview,
  updateReview,
  writeReview,
};
