import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

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

export const studentService = {
  getAllBookingById,
  getAllBooking,
  createBooking,
};
