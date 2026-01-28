import express, { Request, Response } from "express";
// import { userController } from "./user.controller";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {});

// router.post("/register", userController.createUser);

export const userRoute = router;
