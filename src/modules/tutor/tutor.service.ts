import {
  AvailabilitySlot,
  TutorProfile,
} from "../../../generated/prisma/client";
import { TutorProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

// Get aLL tutor
const getAllTutor = async ({
  search,
  isFeatured,
  subject,
  rating,
  price,
  category,
}: {
  search: string | undefined;
  isFeatured: boolean | undefined;
  subject: string | undefined;
  rating: number | undefined;
  price: number | undefined;
  category: string | undefined;
}) => {
  const andConditions: TutorProfileWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          subjects: {
            has: search as string,
          },
        },
        // {
        //   categories: {
        //     contains: search as string,
        //     mode: "insensitive",
        //   },
        // },
      ],
    });
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured,
    });
  }

  const result = await prisma.tutorProfile.findMany({
    where: {
      AND: andConditions,
    },
    include: {
      tutor: true,
      category: true,
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

// Set tutors availability
const setTutorAvailability = async (data: any) => {
  const result = await prisma.availabilitySlot.create({
    data: {
      ...data,
    },
  });
  return result;
};

// tutors all sessions
const tutorSessionsById = async (id: string) => {
  const result = await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      user_id: id,
    },
    include: {
      availability: true,
    },
  });

  // if (!resultUser) {
  //   throw new Error("Couldn't found user and his associations slots !!!");
  // }

  // const result = await prisma.availabilitySlot.findMany({
  //   where: {
  //     tutor_id: resultUser.tutor_id,
  //   },
  // });

  return result;
};

// Get aLL tutor
const getAllTutors = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: "TUTOR",
    },
    include: {
      tutor: {
        include: {
          bookings: true,
          category: true,
        },
      },
    },
  });
  return result;
};

export const tutorService = {
  tutorSessionsById,
  setTutorAvailability,
  getAllTutor,
  getASingleTutorByID,
  updateTutorProfileByID,
  getAllTutors,
};
