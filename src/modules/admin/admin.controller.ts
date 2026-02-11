import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

// Get all category ✔✔✔
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

// View all bookings ✔✔✔
const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await adminService.getAllBookings();

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// View all users ✔✔✔
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getAllUsers();

    res.status(200).json({
      message: "Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update user status by id✔✔✔
const updateUserStatusById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await adminService.updateUserStatusById(id as string, data);

    res.status(201).json({
      message: "User status updated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Delete Category ✔✔✔
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const result = await adminService.deleteCategory(id as string);

    res.status(204).json({
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Add new category ✔✔✔
const addNewCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const result = await adminService.addNewCategory(data);

    res.status(201).json({
      message: "Data creation successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update category ✔✔✔
const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await adminService.updateCategory(id as string, data);

    res.status(201).json({
      message: "Data updated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const adminController = {
  allCategory,
  getAllBookings,
  getAllUsers,
  updateUserStatusById,
  deleteCategory,
  addNewCategory,
  updateCategory,
};
