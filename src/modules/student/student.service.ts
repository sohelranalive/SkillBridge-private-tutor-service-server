import { Booking, Reviews } from "../../../generated/prisma/client";
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

// Get all reviews by student Id ✔✔✔
const getAllReviewsByStudentId = async (id: string) => {
  const result = await prisma.reviews.findMany({
    where: {
      student_id: id,
    },
    include: {
      tutor: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};

// Delete Reviews ✔✔✔
const deleteReview = async (id: string) => {
  const result = await prisma.reviews.delete({
    where: {
      id: id,
    },
  });

  return result;
};

// Update Reviews ✔✔✔
const updateReview = async (id: string, data: Partial<Reviews>) => {
  const result = await prisma.reviews.update({
    where: {
      id: id,
    },
    data,
  });

  return result;
};

// Write Review ✔✔✔
const writeReview = async (data: Reviews) => {
  const result = await prisma.reviews.create({
    data: {
      ...data,
    },
  });

  return result;
};

export const studentService = {
  getAllReviews,
  getBooking,
  createBooking,
  getAllBookingByStudentId,
  getAllReviewsByStudentId,
  deleteReview,
  updateReview,
  writeReview,
};
