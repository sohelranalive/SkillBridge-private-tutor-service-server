import { Request, Response } from "express";
import { studentService } from "./student.service";

// Create Booking
const createBooking = async (req: Request, res: Response) => {
  const result = await studentService.createBooking();

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// Get aLL booking
const getAllBooking = async (req: Request, res: Response) => {
  const result = await studentService.getAllBooking();

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

export const studentController = {
  getAllBooking,
  createBooking,
};
