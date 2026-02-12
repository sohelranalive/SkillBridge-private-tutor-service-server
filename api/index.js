var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express4 from "express";
import cors from "cors";

// src/routes/index.ts
import { Router } from "express";

// src/modules/tutor/tutor.router.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String        @id\n  name          String\n  email         String        @unique\n  emailVerified Boolean       @default(false)\n  image         String?\n  createdAt     DateTime      @default(now())\n  updatedAt     DateTime      @updatedAt\n  phone         String?\n  role          UserRole?     @default(STUDENT)\n  status        UserStatus?   @default(ACTIVE)\n  bookings      Booking[]\n  reviews       Reviews[]\n  tutor         TutorProfile?\n  accounts      Account[]\n  sessions      Session[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum UserRole {\n  ADMIN\n  STUDENT\n  TUTOR\n}\n\nenum UserStatus {\n  ACTIVE\n  BANNED\n}\n\nmodel Booking {\n  booking_id      String   @id @default(uuid())\n  start_time      DateTime\n  end_time        DateTime\n  student_id      String\n  tutor_id        String\n  availability_id String\n\n  student      User             @relation(fields: [student_id], references: [id])\n  tutor        TutorProfile     @relation(fields: [tutor_id], references: [tutor_id])\n  availability AvailabilitySlot @relation(fields: [availability_id], references: [id])\n\n  @@unique([student_id, availability_id])\n}\n\nmodel Categories {\n  category_id   String         @id @default(uuid())\n  category_name String         @unique\n  tutor         TutorProfile[]\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel TutorProfile {\n  tutor_id       String             @id @default(uuid())\n  user_id        String             @unique\n  tutor_category String?\n  subjects       String[]\n  isFeatured     Boolean            @default(false)\n  price          Int?\n  about          String?\n  education      String[]\n  isVerified     Boolean            @default(false)\n  language       String[]\n  availability   AvailabilitySlot[]\n  bookings       Booking[]\n  reviews        Reviews[]\n  category       Categories?        @relation(fields: [tutor_category], references: [category_id])\n  user           User               @relation(fields: [user_id], references: [id])\n}\n\nmodel AvailabilitySlot {\n  id         String       @id @default(uuid())\n  tutor_id   String\n  start_time DateTime\n  end_time   DateTime\n  subject    String\n  tutor      TutorProfile @relation(fields: [tutor_id], references: [tutor_id])\n  bookings   Booking[]\n\n  @@unique([tutor_id, start_time, end_time, subject])\n  @@index([tutor_id, start_time, end_time])\n}\n\nmodel Reviews {\n  id         String       @id @default(uuid())\n  tutor_id   String\n  reviewText String\n  student_id String\n  ratings    Float\n  createdAt  DateTime     @default(now())\n  student    User         @relation(fields: [student_id], references: [id])\n  tutor      TutorProfile @relation(fields: [tutor_id], references: [tutor_id])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"phone","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ReviewsToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Booking":{"fields":[{"name":"booking_id","kind":"scalar","type":"String"},{"name":"start_time","kind":"scalar","type":"DateTime"},{"name":"end_time","kind":"scalar","type":"DateTime"},{"name":"student_id","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"availability_id","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"availability","kind":"object","type":"AvailabilitySlot","relationName":"AvailabilitySlotToBooking"}],"dbName":null},"Categories":{"fields":[{"name":"category_id","kind":"scalar","type":"String"},{"name":"category_name","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"CategoriesToTutorProfile"}],"dbName":null},"TutorProfile":{"fields":[{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"tutor_category","kind":"scalar","type":"String"},{"name":"subjects","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"price","kind":"scalar","type":"Int"},{"name":"about","kind":"scalar","type":"String"},{"name":"education","kind":"scalar","type":"String"},{"name":"isVerified","kind":"scalar","type":"Boolean"},{"name":"language","kind":"scalar","type":"String"},{"name":"availability","kind":"object","type":"AvailabilitySlot","relationName":"AvailabilitySlotToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ReviewsToTutorProfile"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToTutorProfile"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"}],"dbName":null},"AvailabilitySlot":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"start_time","kind":"scalar","type":"DateTime"},{"name":"end_time","kind":"scalar","type":"DateTime"},{"name":"subject","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"AvailabilitySlotToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"AvailabilitySlotToBooking"}],"dbName":null},"Reviews":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"reviewText","kind":"scalar","type":"String"},{"name":"student_id","kind":"scalar","type":"String"},{"name":"ratings","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"student","kind":"object","type":"User","relationName":"ReviewsToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewsToTutorProfile"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  AvailabilitySlotScalarFieldEnum: () => AvailabilitySlotScalarFieldEnum,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoriesScalarFieldEnum: () => CategoriesScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewsScalarFieldEnum: () => ReviewsScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Booking: "Booking",
  Categories: "Categories",
  TutorProfile: "TutorProfile",
  AvailabilitySlot: "AvailabilitySlot",
  Reviews: "Reviews"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  phone: "phone",
  role: "role",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BookingScalarFieldEnum = {
  booking_id: "booking_id",
  start_time: "start_time",
  end_time: "end_time",
  student_id: "student_id",
  tutor_id: "tutor_id",
  availability_id: "availability_id"
};
var CategoriesScalarFieldEnum = {
  category_id: "category_id",
  category_name: "category_name"
};
var TutorProfileScalarFieldEnum = {
  tutor_id: "tutor_id",
  user_id: "user_id",
  tutor_category: "tutor_category",
  subjects: "subjects",
  isFeatured: "isFeatured",
  price: "price",
  about: "about",
  education: "education",
  isVerified: "isVerified",
  language: "language"
};
var AvailabilitySlotScalarFieldEnum = {
  id: "id",
  tutor_id: "tutor_id",
  start_time: "start_time",
  end_time: "end_time",
  subject: "subject"
};
var ReviewsScalarFieldEnum = {
  id: "id",
  tutor_id: "tutor_id",
  reviewText: "reviewText",
  student_id: "student_id",
  ratings: "ratings",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/tutor/tutor.service.ts
var getAllTutor = async ({
  search,
  isFeatured,
  price,
  category,
  ratings,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          subjects: {
            has: search
          }
        },
        {
          category: {
            category_name: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured
    });
  }
  if (price && price > 0) {
    const rate = Number(price);
    andConditions.push({
      price: { gte: rate }
    });
  }
  if (category) {
    andConditions.push({
      category: {
        category_name: {
          contains: category,
          mode: "insensitive"
        }
      }
    });
  }
  andConditions.push({
    isVerified: true
  });
  const result = await prisma.tutorProfile.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          role: true,
          status: true
        }
      },
      category: {
        select: {
          category_name: true
        }
      },
      availability: {
        select: {
          id: true,
          start_time: true,
          end_time: true
        }
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
              image: true
            }
          }
        }
      }
    },
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const count = await prisma.tutorProfile.count({
    where: {
      AND: andConditions
    }
  });
  const addAvgWithResult = result.map((tutor) => {
    const avgRating = tutor.reviews.length ? tutor.reviews.reduce((sum, review) => sum + review.ratings, 0) / tutor.reviews.length : 0;
    return {
      ...tutor,
      avgRating: Number(avgRating.toFixed(2)),
      reviewCount: tutor.reviews.length
    };
  });
  if (ratings && ratings > 0) {
    let filteredResult = result.map((tutor) => {
      const avgRating = tutor.reviews.length > 0 ? tutor.reviews.reduce((sum, review) => sum + review.ratings, 0) / tutor.reviews.length : 0;
      return {
        ...tutor,
        avgRating: Number(avgRating.toFixed(2)),
        reviewCount: tutor.reviews.length
      };
    });
    filteredResult = filteredResult.filter(
      (tutor) => tutor.avgRating >= ratings
    );
    const paginatedResult = filteredResult.slice(skip, skip + limit);
    const count2 = filteredResult.length;
    return {
      data: paginatedResult,
      pagination: {
        count: count2,
        page,
        limit,
        totalPage: Math.ceil(count2 / limit)
      }
    };
  }
  return {
    data: addAvgWithResult,
    pagination: {
      count,
      page,
      limit,
      totalPage: Math.ceil(count / limit)
    }
  };
};
var getASingleTutorById = async (id) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      tutor_id: id
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          role: true,
          status: true
        }
      },
      category: {
        select: {
          category_name: true
        }
      },
      availability: {
        select: {
          id: true,
          start_time: true,
          end_time: true,
          subject: true
        }
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
              image: true
            }
          }
        }
      }
    }
  });
  return result;
};
var getTutorProfileByUserId = async (id) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      user_id: id
    }
  });
  return result;
};
var updateTutorProfileById = async (id, data) => {
  const result = await prisma.tutorProfile.update({
    where: {
      tutor_id: id
    },
    data
  });
  return result;
};
var getAllBookingByTutorId = async (id) => {
  const result = await prisma.booking.findMany({
    where: {
      tutor_id: id
    },
    include: {
      tutor: {
        include: {
          user: true
        }
      },
      student: true,
      availability: true
    }
  });
  return result;
};
var getAllReviewsByTutorId = async (id) => {
  const result = await prisma.reviews.findMany({
    where: {
      tutor_id: id
    },
    include: {
      student: true
    }
  });
  return result;
};
var getTutorAvailability = async (id) => {
  const result = await prisma.availabilitySlot.findMany({
    where: {
      tutor_id: id
    }
  });
  return result;
};
var deleteTutorAvailability = async (id) => {
  const booking = await prisma.booking.findMany({
    where: {
      availability_id: id
    }
  });
  if (booking.length) {
    return "Booking exists";
  }
  const result = await prisma.availabilitySlot.delete({
    where: {
      id
    }
  });
  return result;
};
var setTutorAvailability = async (data) => {
  const result = await prisma.availabilitySlot.create({
    data: {
      ...data
    }
  });
  return result;
};
var tutorService = {
  getAllTutor,
  getASingleTutorById,
  getTutorProfileByUserId,
  updateTutorProfileById,
  getAllBookingByTutorId,
  getAllReviewsByTutorId,
  getTutorAvailability,
  deleteTutorAvailability,
  setTutorAvailability
};

// src/helpers/paginationHelper.ts
var paginationHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 100;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "price";
  const sortOrder = options.sortOrder || "asc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationHelper_default = paginationHelper;

// src/modules/tutor/tutor.controller.ts
var getAllTutor2 = async (req, res) => {
  try {
    const search = req.query.search;
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" ? true : req.query.isFeatured === "false" ? false : void 0 : void 0;
    const price = req.query.price;
    const ratings = req.query.ratings;
    const category = req.query.category;
    const options = paginationHelper_default(req.query);
    const { page, limit, skip, sortBy, sortOrder } = options;
    const result = await tutorService.getAllTutor({
      search,
      isFeatured,
      price,
      category,
      ratings,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getASingleTutorById2 = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await tutorService.getASingleTutorById(id);
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getTutorProfileByUserId2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await tutorService.getTutorProfileByUserId(id);
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateTutorProfileById2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await tutorService.updateTutorProfileById(
      id,
      data
    );
    res.status(200).json({
      message: "Data updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllBookingByTutorId2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await tutorService.getAllBookingByTutorId(id);
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllReviewsByTutorId2 = async (req, res, next) => {
  try {
    const tutorId = req.params.id;
    const result = await tutorService.getAllReviewsByTutorId(tutorId);
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getTutorAvailability2 = async (req, res, next) => {
  try {
    const tutorId = req.params.id;
    const result = await tutorService.getTutorAvailability(tutorId);
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteTutorAvailability2 = async (req, res, next) => {
  try {
    const availabilityId = req.params.id;
    const result = await tutorService.deleteTutorAvailability(
      availabilityId
    );
    if (result == "Booking exists") {
      res.status(404).json({
        message: "Booking exits",
        data: result
      });
    } else {
      res.status(204).json({
        message: "Data deleted successfully",
        data: result
      });
    }
  } catch (error) {
    next(error);
  }
};
var setTutorAvailability2 = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await tutorService.setTutorAvailability(data);
    res.status(201).json({
      message: "Data created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var tutorController = {
  getAllTutor: getAllTutor2,
  getASingleTutorById: getASingleTutorById2,
  getTutorProfileByUserId: getTutorProfileByUserId2,
  updateTutorProfileById: updateTutorProfileById2,
  getAllBookingByTutorId: getAllBookingByTutorId2,
  getAllReviewsByTutorId: getAllReviewsByTutorId2,
  getTutorAvailability: getTutorAvailability2,
  deleteTutorAvailability: deleteTutorAvailability2,
  setTutorAvailability: setTutorAvailability2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 30 * 60
      // 30 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  },
  trustedOrigins: [process.env.APP_AUTH_URL],
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false
      },
      image: {
        type: "string",
        required: false
      },
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessType: "offline"
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.role === "TUTOR") {
            const data = {
              user_id: user.id
            };
            await prisma.tutorProfile.create({
              data
            });
          }
        }
      }
    }
  }
});

// src/middleware/authentication.ts
var authentication = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        res.status(401).json({
          success: false,
          message: "You are not authorized!!!"
        });
      }
      req.user = {
        id: session?.user.id,
        name: session?.user.name,
        email: session?.user.email,
        emailVerified: session?.user.emailVerified,
        image: session?.user.image,
        phone: session?.user.phone,
        role: session?.user.role,
        status: session?.user.status
      };
      if (roles.length && !roles.includes(req.user.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden ! You don't have permission to access"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var authentication_default = authentication;

// src/modules/tutor/tutor.router.ts
var router = express.Router();
router.get("/all-tutor", tutorController.getAllTutor);
router.get("/tutor-profile/:id", tutorController.getASingleTutorById);
router.get(
  "/user/:id",
  authentication_default("TUTOR"),
  tutorController.getTutorProfileByUserId
);
router.patch(
  "/tutor-profile/update/:id",
  authentication_default("TUTOR"),
  tutorController.updateTutorProfileById
);
router.get(
  "/all-bookings/:id",
  authentication_default("TUTOR"),
  tutorController.getAllBookingByTutorId
);
router.get(
  "/all-reviews/:id",
  authentication_default("TUTOR"),
  tutorController.getAllReviewsByTutorId
);
router.get(
  "/availability/:id",
  authentication_default("TUTOR"),
  tutorController.getTutorAvailability
);
router.delete(
  "/delete-availability/:id",
  authentication_default("TUTOR"),
  tutorController.deleteTutorAvailability
);
router.post(
  "/tutor-availability",
  authentication_default("TUTOR"),
  tutorController.setTutorAvailability
);
var tutorRouter = router;

// src/modules/student/student.router.ts
import express2 from "express";

// src/modules/student/student.service.ts
var getAllReviews = async () => {
  const result = await prisma.reviews.findMany({
    include: {
      student: true,
      tutor: {
        include: {
          category: true,
          user: true
        }
      }
    },
    orderBy: {
      ratings: "desc"
    }
  });
  return result;
};
var getBooking = async ({
  student_id,
  availability_id
}) => {
  const result = await prisma.booking.findUnique({
    where: {
      student_id_availability_id: {
        student_id,
        availability_id
      }
    }
  });
  return result;
};
var createBooking = async (data) => {
  const result = await prisma.booking.create({
    data: {
      ...data
    }
  });
  return result;
};
var getAllBookingByStudentId = async (id) => {
  const result = await prisma.booking.findMany({
    where: {
      student_id: id
    },
    include: {
      tutor: {
        include: {
          user: true
        }
      },
      student: true,
      availability: true
    }
  });
  return result;
};
var getAllReviewsByStudentId = async (id) => {
  const result = await prisma.reviews.findMany({
    where: {
      student_id: id
    },
    include: {
      tutor: {
        include: {
          user: true
        }
      }
    }
  });
  return result;
};
var deleteReview = async (id) => {
  const result = await prisma.reviews.delete({
    where: {
      id
    }
  });
  return result;
};
var updateReview = async (id, data) => {
  const result = await prisma.reviews.update({
    where: {
      id
    },
    data
  });
  return result;
};
var writeReview = async (data) => {
  const result = await prisma.reviews.create({
    data: {
      ...data
    }
  });
  return result;
};
var studentService = {
  getAllReviews,
  getBooking,
  createBooking,
  getAllBookingByStudentId,
  getAllReviewsByStudentId,
  deleteReview,
  updateReview,
  writeReview
};

// src/modules/student/student.controller.ts
var getAllReviews2 = async (req, res) => {
  try {
    const result = await studentService.getAllReviews();
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getBooking2 = async (req, res, next) => {
  try {
    const student_id = req.query.studentId;
    const availability_id = req.query.availabilityId;
    const result = await studentService.getBooking({
      student_id,
      availability_id
    });
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var createBooking2 = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await studentService.createBooking(data);
    res.status(201).json({
      message: "Data creation successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllBookingByStudentId2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await studentService.getAllBookingByStudentId(id);
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllReviewsByStudentId2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await studentService.getAllReviewsByStudentId(id);
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteReview2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await studentService.deleteReview(id);
    res.status(204).json({
      message: "Content deleted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateReview2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await studentService.updateReview(id, data);
    res.status(200).json({
      message: "Reviews updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var writeReview2 = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await studentService.writeReview(data);
    res.status(201).json({
      message: "Data creation successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var studentController = {
  getAllReviews: getAllReviews2,
  getBooking: getBooking2,
  createBooking: createBooking2,
  getAllBookingByStudentId: getAllBookingByStudentId2,
  getAllReviewsByStudentId: getAllReviewsByStudentId2,
  deleteReview: deleteReview2,
  updateReview: updateReview2,
  writeReview: writeReview2
};

// src/modules/student/student.router.ts
var router2 = express2.Router();
router2.get("/all-review", studentController.getAllReviews);
router2.get("/booking", authentication_default("STUDENT"), studentController.getBooking);
router2.post(
  "/create-booking",
  authentication_default("STUDENT"),
  studentController.createBooking
);
router2.get(
  "/all-booking/:id",
  authentication_default("STUDENT"),
  studentController.getAllBookingByStudentId
);
router2.get(
  "/all-reviews/:id",
  authentication_default("STUDENT"),
  studentController.getAllReviewsByStudentId
);
router2.delete(
  "/delete-review/:id",
  authentication_default("STUDENT"),
  studentController.deleteReview
);
router2.patch(
  "/update-review/:id",
  authentication_default("STUDENT"),
  studentController.updateReview
);
router2.post(
  "/write-review",
  authentication_default("STUDENT"),
  studentController.writeReview
);
var studentRouter = router2;

// src/modules/admin/admin.router.ts
import express3 from "express";

// src/modules/admin/admin.service.ts
var allCategory = async () => {
  const result = await prisma.categories.findMany({
    include: {
      _count: {
        select: { tutor: true }
      }
    }
  });
  return result;
};
var getAllBookings = async () => {
  const result = await prisma.booking.findMany({
    include: {
      student: true,
      tutor: {
        include: {
          user: true
        }
      }
    }
  });
  return result;
};
var getAllUsers = async () => {
  const result = await prisma.user.findMany({
    include: {
      tutor: true
    }
  });
  return result;
};
var updateUserStatusById = async (id, data) => {
  const result = await prisma.user.update({
    where: {
      id
    },
    data
  });
  return result;
};
var deleteCategory = async (id) => {
  const result = await prisma.categories.delete({
    where: {
      category_id: id
    }
  });
  return result;
};
var addNewCategory = async (data) => {
  const result = await prisma.categories.create({
    data
  });
  return result;
};
var updateCategory = async (id, data) => {
  const result = await prisma.categories.update({
    where: {
      category_id: id
    },
    data
  });
  return result;
};
var adminService = {
  allCategory,
  getAllBookings,
  getAllUsers,
  updateUserStatusById,
  deleteCategory,
  addNewCategory,
  updateCategory
};

// src/modules/admin/admin.controller.ts
var allCategory2 = async (req, res) => {
  try {
    const result = await adminService.allCategory();
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getAllBookings2 = async (req, res, next) => {
  try {
    const result = await adminService.getAllBookings();
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllUsers2 = async (req, res, next) => {
  try {
    const result = await adminService.getAllUsers();
    res.status(200).json({
      message: "Data retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateUserStatusById2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await adminService.updateUserStatusById(id, data);
    res.status(201).json({
      message: "User status updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteCategory2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await adminService.deleteCategory(id);
    res.status(204).json({
      message: "Category deleted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var addNewCategory2 = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await adminService.addNewCategory(data);
    res.status(201).json({
      message: "Data creation successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateCategory2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await adminService.updateCategory(id, data);
    res.status(201).json({
      message: "Data updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var adminController = {
  allCategory: allCategory2,
  getAllBookings: getAllBookings2,
  getAllUsers: getAllUsers2,
  updateUserStatusById: updateUserStatusById2,
  deleteCategory: deleteCategory2,
  addNewCategory: addNewCategory2,
  updateCategory: updateCategory2
};

// src/modules/admin/admin.router.ts
var router3 = express3.Router();
router3.get("/all-category", adminController.allCategory);
router3.get(
  "/all-bookings",
  authentication_default("ADMIN"),
  adminController.getAllBookings
);
router3.get("/all-users", authentication_default("ADMIN"), adminController.getAllUsers);
router3.patch(
  "/user-update/:id",
  authentication_default("ADMIN"),
  adminController.updateUserStatusById
);
router3.delete(
  "/delete-category/:id",
  authentication_default("ADMIN"),
  adminController.deleteCategory
);
router3.post(
  "/add-category",
  authentication_default("ADMIN"),
  adminController.addNewCategory
);
router3.patch(
  "/update-category/:id",
  authentication_default("ADMIN"),
  adminController.updateCategory
);
var adminRouter = router3;

// src/routes/index.ts
var routes = Router();
routes.use("/admin", adminRouter);
routes.use("/tutor", tutorRouter);
routes.use("/student", studentRouter);
var routes_default = routes;

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route Not Found",
    path: req.originalUrl,
    date: Date()
  });
}

// src/middleware/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You have entered incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Unique constraint failed on the";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign Key Constant failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Unknown Error";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed Please check DB credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach DB server";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/app.ts
var app = express4();
app.use(express4.json());
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
  // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/skillbridge-private-tutor-service-c.*\.vercel\.app$/.test(
        origin
      ) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.get("/", (req, res) => {
  res.send(`Welcome to SkillBridge Backend`);
});
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/v1", routes_default);
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
