import {
  AvailabilitySlot,
  TutorProfile,
} from "../../../generated/prisma/client";
import { TutorProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

// Get all tutor ✔✔✔
const getAllTutor = async ({
  search,
  isFeatured,
  price,
  category,
  ratings,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  isFeatured: boolean | undefined;
  price: number | undefined;
  category: string | undefined;
  ratings: number | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
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
        {
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

  if (price && price > 0) {
    const rate = Number(price);
    andConditions.push({
      price: { gte: rate },
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

  andConditions.push({
    isVerified: true,
  });

  const result = await prisma.tutorProfile.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    include: {
      user: {
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
      availability: {
        select: {
          id: true,
          start_time: true,
          end_time: true,
        },
      },
      reviews: {
        select: {
          id: true,
          reviewText: true,
          ratings: true,
          createdAt: true,
          student: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const count = await prisma.tutorProfile.count({
    where: {
      AND: andConditions,
    },
  });

  const addAvgWithResult = result.map((tutor) => {
    const avgRating = tutor.reviews.length
      ? tutor.reviews.reduce((sum, review) => sum + review.ratings, 0) /
        tutor.reviews.length
      : 0;

    return {
      ...tutor,
      avgRating: Number(avgRating.toFixed(2)),
      reviewCount: tutor.reviews.length,
    };
  });

  if (ratings && ratings > 0) {
    let filteredResult = result.map((tutor) => {
      const avgRating =
        tutor.reviews.length > 0
          ? tutor.reviews.reduce((sum, review) => sum + review.ratings, 0) /
            tutor.reviews.length
          : 0;

      return {
        ...tutor,
        avgRating: Number(avgRating.toFixed(2)),
        reviewCount: tutor.reviews.length,
      };
    });

    filteredResult = filteredResult.filter(
      (tutor) => tutor.avgRating >= ratings,
    );

    const paginatedResult = filteredResult.slice(skip, skip + limit);
    const count = filteredResult.length;

    return {
      data: paginatedResult,
      pagination: {
        count,
        page,
        limit,
        totalPage: Math.ceil(count / limit),
      },
    };
  }

  return {
    data: addAvgWithResult,
    pagination: {
      count,
      page,
      limit,
      totalPage: Math.ceil(count / limit),
    },
  };
};

// Get a single tutor by id ✔✔✔
const getASingleTutorById = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      tutor_id: id,
    },
    include: {
      user: {
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
      availability: {
        select: {
          id: true,
          start_time: true,
          end_time: true,
          subject: true,
        },
      },
      reviews: {
        select: {
          id: true,
          reviewText: true,
          ratings: true,
          createdAt: true,
          student: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
  return result;
};

// Get tutor profile by user id ✔✔✔
const getTutorProfileByUserId = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      user_id: id,
    },
  });
  return result;
};

// Update tutor profile by id ✔✔✔
const updateTutorProfileById = async (
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
  getAllTutor,
  getASingleTutorById,
  getTutorProfileByUserId,
  updateTutorProfileById,
  tutorSessionsById,
  setTutorAvailability,
};
