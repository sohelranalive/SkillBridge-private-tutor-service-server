import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

// Initialize express app
const app = express();

// Json Parser
app.use(express.json());

// Cors
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send(`Welcome to SkillBridge Backend`);
});

// All Routes
app.use("/api/v1", routes);

// Handle path errors
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "route not found",
    path: req.path,
  });
});

// Handle JSON parsing errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON payload",
    });
  }
  next(err);
});

export default app;
