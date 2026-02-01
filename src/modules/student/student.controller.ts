import { Request, Response } from "express";
import { studentService } from "./student.service";

// Create Booking
const createBooking = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await studentService.createBooking(data);

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// Get all booking by Id
const getAllBookingById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.getAllBookingById(id as string);

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// Get all booking
const getAllBooking = async (req: Request, res: Response) => {
  const result = await studentService.getAllBooking();

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  const result = await studentService.getAllStudents();

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

export const studentController = {
  getAllBookingById,
  getAllBooking,
  createBooking,
  getAllStudents,
};
