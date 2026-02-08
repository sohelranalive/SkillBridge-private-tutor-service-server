import { prisma } from "../../lib/prisma";
import { UserStatus } from "../../../generated/prisma/enums";
import { Categories } from "../../../generated/prisma/client";
import { _includes, includes } from "better-auth/*";

// Get all category ✔✔✔
const allCategory = async () => {
  const result = await prisma.categories.findMany({
    include: {
      _count: {
        select: { tutor: true },
      },
    },
  });

  return result;
};

// view all bookings
const getAllBookings = async () => {
  const result = await prisma.booking.findMany();
  return result;
};

// Update user status
const updateUserStatusById = async (id: string, data: UserStatus) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });

  return result;
};

// add new category
const addNewCategory = async (data: any) => {
  const result = await prisma.categories.create({
    data,
  });

  return result;
};

// update category
const updateCategory = async (id: string, data: any) => {
  const result = await prisma.categories.update({
    where: {
      category_id: id,
    },
    data,
  });

  return result;
};

export const adminService = {
  addNewCategory,
  getAllBookings,
  updateUserStatusById,
  updateCategory,
  allCategory,
};
