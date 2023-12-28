import { Router } from "express";
import userController from "../controller/user-controller.js";
import authMiddle from "../../auth/middlewares/auth-middle.js";
import { upload } from "../../../utils/multer.js";

export const usersRouter: Router = Router();

usersRouter.get("/users", userController.getUser);
usersRouter.get("/getme", authMiddle.checkToken, userController.getMe);
usersRouter.put(
  "/users/:id",
  authMiddle.checkToken,
  upload.single("image"),
  userController.upDateUser
);
