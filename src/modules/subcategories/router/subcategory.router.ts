import { Router } from "express";
import subcategoryController from "../controller/subcategory.controller.js";
export const subCategoriesRouter: Router = Router();

subCategoriesRouter.get(
  "/sub_categories",
  subcategoryController.getSubCategories
);
