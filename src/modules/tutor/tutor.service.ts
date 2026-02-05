import {
  AvailabilitySlot,
  TutorProfile,
} from "../../../generated/prisma/client";
import { TutorProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

// Get all tutors
const getAllTutor = async ({
  search,
  isFeatured,
  subject,
  ratings,
  price,
  category,
}: {
  search: string | undefined;
  isFeatured: boolean | undefined;
  subject: string | undefined;
  ratings: number | undefined;
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
          category: {
            category_name: {
              contains: search as string,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured,
    });
  }

  if (subject) {
    andConditions.push({
      subjects: {
        has: subject as string,
      },
    });
  }

  if (ratings && ratings > 0) {
    const rating = Number(ratings);
    andConditions.push({
      ratings: { in: [rating] },
    });
  }

  if (price && price > 0) {
    const rate = Number(price);
    andConditions.push({
      price: { in: [rate] },
    });
  }

  if (category) {
    andConditions.push({
      category: {
        category_name: {
          contains: category as string,
          mode: "insensitive",
        },
      },
    });
  }

  // console.log("AND Conditions: ", JSON.stringify(andConditions, null, 2));

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
      tutor: {
        select: {
          name: true,
          image: true,
          role: true,
          status: true,
        },
      },
      category: {
        select: {
          category_name: true,
        },
      },
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

  return result;
};

export const tutorService = {
  tutorSessionsById,
  setTutorAvailability,
  getAllTutor,
  getASingleTutorByID,
  updateTutorProfileByID,
};
