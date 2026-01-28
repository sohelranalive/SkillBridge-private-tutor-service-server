import express, { Request, Response } from "express";
// import { userController } from "./user.controller";

const router = express.Router();

router.get("/register", (req: Request, res: Response) => {
  console.log("Hello");
});

// router.post("/register", userController.createUser);

export const userRoute = router;
