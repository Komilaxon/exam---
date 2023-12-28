import { Router } from "express";
import categoriesController from "../controller/categories-controller.js";
import authMiddle from "../../auth/middlewares/auth-middle.js";

export const categoriesRouter: Router = Router();

categoriesRouter.get("/categories", categoriesController.getCategories);
categoriesRouter.get(
  "/categories/:name",
  categoriesController.getCategoryByName
);
categoriesRouter.post(
  "/categories",
  authMiddle.checkToken,
  categoriesController.createCategory
);
