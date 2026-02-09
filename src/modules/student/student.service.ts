import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// Get all reviews ✔✔✔
const getAllReviews = async () => {
  const result = await prisma.reviews.findMany({
    include: {
      student: true,
      tutor: {
        include: {
          category: true,
          user: true,
        },
      },
    },
    orderBy: {
      ratings: "desc",
    },
  });
  return result;
};

// Get booking with query ✔✔✔
const getBooking = async ({
  student_id,
  availability_id,
}: {
  student_id: string;
  availability_id: string;
}) => {
  const result = await prisma.booking.findUnique({
    where: {
      student_id_availability_id: {
        student_id: student_id,
        availability_id: availability_id,
      },
    },
  });

  return result;
};

// Create booking ✔✔✔
const createBooking = async (data: Booking) => {
  const result = await prisma.booking.create({
    data: {
      ...data,
    },
  });

  return result;
};

// Get all booking by student Id ✔✔✔
const getAllBookingByStudentId = async (id: string) => {
  const result = await prisma.booking.findMany({
    where: {
      student_id: id,
    },
    include: {
      tutor: {
        include: {
          user: true,
        },
      },
      student: true,
      availability: true,
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
  getAllBookingByStudentId,
  getBooking,
  createBooking,
  getAllStudents,
};
