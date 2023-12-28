import { Router } from "express";
import authController from "../controller/auth-controller.js";
import authMiddle from "../middlewares/auth-middle.js";

export const authRouter: Router = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authMiddle.signUp, authController.register);
