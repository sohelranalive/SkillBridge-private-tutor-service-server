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

// View all bookings ✔✔✔
const getAllBookings = async () => {
  const result = await prisma.booking.findMany({
    include: {
      student: true,
      tutor: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};

// View all users ✔✔✔
const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    include: {
      tutor: true,
    },
  });
  return result;
};

// Update user status by id ✔✔✔
const updateUserStatusById = async (id: string, data: UserStatus) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

// Delete Category ✔✔✔
const deleteCategory = async (id: string) => {
  const result = await prisma.categories.delete({
    where: {
      category_id: id,
    },
  });

  return result;
};

// Add new category ✔✔✔
const addNewCategory = async (data: any) => {
  const result = await prisma.categories.create({
    data,
  });

  return result;
};

// Update category ✔✔✔
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
  allCategory,
  getAllBookings,
  getAllUsers,
  updateUserStatusById,
  deleteCategory,
  addNewCategory,
  updateCategory,
};
