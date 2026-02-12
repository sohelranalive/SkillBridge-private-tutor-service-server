import { betterAuth, sessionSchema } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 30 * 60, // 30 minutes
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
  },
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");

    const allowedOrigins = [
      process.env.APP_URL,
      process.env.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5000",
      "https://next-blog-client-part-6.vercel.app",
      "https://prisma-blog-server-navy.vercel.app",
    ].filter(Boolean);

    // Check if origin matches allowed origins or Vercel pattern
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/.*\.vercel\.app$/.test(origin)
    ) {
      return [origin];
    }

    return [];
  },
  basePath: "/api/auth",
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      image: {
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
  socialProviders: {
    google: {
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: "offline",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.role === "TUTOR") {
            const data = {
              user_id: user.id as string,
            };
            await prisma.tutorProfile.create({
              data,
            });
          }
        },
      },
    },
  },
});
