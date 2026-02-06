import { Router } from "express";
import { tutorRouter } from "../modules/tutor/tutor.router";
import { studentRouter } from "../modules/student/student.router";
import { adminRouter } from "../modules/admin/admin.router";

const routes = Router();

routes.use("/admin", adminRouter);

routes.use("/tutor", tutorRouter);

routes.use("/student", studentRouter);

export default routes;
