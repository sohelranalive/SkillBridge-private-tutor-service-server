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

app.use(
  cors({
    origin: process.env.APP_AUTH_URL || "http://localhost:3000", // client side url
    credentials: true,
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
