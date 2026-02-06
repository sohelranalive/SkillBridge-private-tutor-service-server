import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// Get all reviews
const getAllReviews = async () => {
  const result = await prisma.reviews.findMany({
    include: {
      student: true,
    },
    orderBy: {
      ratings: "desc",
    },
  });
  return result;
};

// Create booking
const createBooking = async (data: Booking) => {
  const result = await prisma.booking.create({
    data: {
      ...data,
    },
  });
  return result;
};

// Get all booking by Id
const getAllBookingById = async (id: string) => {
  const result = await prisma.booking.findMany({
    where: {
      student_id: id,
    },
    include: {
      tutor: true,
      student: true,
    },
  });
  return result;
};

// Get aLL booking
const getAllBooking = async () => {
  const result = await prisma.booking.findMany({
    include: {
      tutor: true,
      student: true,
    },
  });
  return result;
};

// Get aLL students
const getAllStudents = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
    include: {
      bookings: true,
    },
  });
  return result;
};

export const studentService = {
  getAllReviews,
  getAllBookingById,
  getAllBooking,
  createBooking,
  getAllStudents,
};
