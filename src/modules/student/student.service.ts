import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// Get aLL booking
const getAllBooking = async () => {
  const result = await prisma.tutorProfile.findMany({
    include: {
      tutor: true,
      category: true,
      availability: true,
      bookings: true,
    },
  });
  return result;
};

// Create booking
const createBooking = async () => {
  const result = await prisma.tutorProfile.findMany({
    include: {
      tutor: true,
      category: true,
      availability: true,
      bookings: true,
    },
  });
  return result;
};

export const studentService = {
  getAllBooking,
  createBooking,
};
