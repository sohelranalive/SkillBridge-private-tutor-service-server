import { Router } from "express";
import { tutorRouter } from "../modules/tutor/tutor.router";
import { studentRouter } from "../modules/student/student.router";

const routes = Router();

routes.use("/tutor", tutorRouter);

routes.use("/student", studentRouter);

export default routes;
