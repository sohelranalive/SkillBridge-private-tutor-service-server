import { Router } from "express";
import { userRoute } from "../modules/user/user.route";

const routes = Router();

routes.use("/user", userRoute);

export default routes;
