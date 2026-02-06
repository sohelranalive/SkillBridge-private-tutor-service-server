import { Request, Response } from "express";
import { adminService } from "./admin.service";

// Get all category
const allCategory = async (req: Request, res: Response) => {
  try {
    const result = await adminService.allCategory();

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

// get all bookings
const getAllBookings = async (req: Request, res: Response) => {
  const result = await adminService.getAllBookings();

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// update user status
const updateUserStatusById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await adminService.updateUserStatusById(id as string, data);

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// add new category
const addNewCategory = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await adminService.addNewCategory(data);

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

// update category
const updateCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await adminService.updateCategory(id as string, data);

  res.status(200).json({
    message: "Data retrieved successfully",
    data: result,
  });
};

export const adminController = {
  updateCategory,
  getAllBookings,
  updateUserStatusById,
  addNewCategory,
  allCategory,
};
