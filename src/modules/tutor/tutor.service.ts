import { TutorProfile } from "../../../generated/prisma/client";
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

export const tutorService = {
  getAllTutor,
  getASingleTutorByID,
  updateTutorProfileByID,
};
