import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { notFound } from "./middleware/notFound";
import errorHandler from "./middleware/globalErrorHandler";

// Initialize express app
const app = express();

// Json Parser
app.use(express.json());

// Cors
// app.use(cors());

// Configure CORS to allow both production and Vercel preview deployments
const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values

// app.use(
//   cors({
//     origin: process.env.APP_AUTH_URL || "http://localhost:3000", // client side url
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/skillbridge-private-tutor-service-c.*\.vercel\.app$/.test(
          origin,
        ) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

// Root route
app.get("/", (req, res) => {
  res.send(`Welcome to SkillBridge Backend`);
});

// Better-auth handler
app.all("/api/auth/*splat", toNodeHandler(auth));

// All Routes
app.use("/api/v1", routes);

// Handle Not found
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// // Handle path errors
// app.use((req: Request, res: Response) => {
//   res.status(404).json({
//     message: "route not found",
//     path: req.path,
//   });
// });

// // Handle JSON parsing errors
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof SyntaxError && "body" in err) {
//     return res.status(400).json({
//       message: "Invalid JSON payload",
//     });
//   }
//   next(err);
// });

export default app;
