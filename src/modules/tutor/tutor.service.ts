import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// Get aLL tutor
const getAllTutor = async () => {
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

// Get a single tutor by id
const getASingleTutorByID = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      tutor_id: id,
    },
    include: {
      tutor: true,
      category: true,
      availability: true,
      bookings: true,
    },
  });
  return result;
};

// Update tutor profile
const updateTutorProfileByID = async (
  id: string,
  data: Partial<TutorProfile>,
) => {
  const result = await prisma.tutorProfile.update({
    where: {
      tutor_id: id,
    },
    data,
  });
  return result;
};

export const tutorService = {
  getAllTutor,
  getASingleTutorByID,
  updateTutorProfileByID,
};
