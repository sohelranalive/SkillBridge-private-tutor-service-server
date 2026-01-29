import { betterAuth, sessionSchema } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { InsertIntoTutorTable } from "../helpers/StoreTutor";
import { createAuthMiddleware } from "better-auth/api";
import { User } from "../../generated/prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_AUTH_URL as string],
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  hooks: {
    // before: createAuthMiddleware(async (ctx) => {
    //   // Execute before processing the request
    //   console.log("Request path:", ctx.path);
    // }),
    after: createAuthMiddleware(async (ctx) => {
      // Execute after processing the request

      const {
        user: { id: userId },
      } = ctx.context.returned as {
        user: { id: string };
      };
      await prisma.tutorProfile.create({
        data: {
          user_id: userId,
        },
      });
    }),
  },
});
