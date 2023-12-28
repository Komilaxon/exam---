import { Router } from "express";
import skillsController from "../controller/skills-controller.js";

export const skillsRouter: Router = Router();

skillsRouter.get("/skills", skillsController.getSkills);
skillsRouter.post("/skills/:id", skillsController.createSkills);

