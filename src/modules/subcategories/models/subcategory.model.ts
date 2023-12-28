import { model } from "mongoose";
import {
  subCategorySchema,
  SubCategories,
} from "../../subcategories/schema/subcategories.schema";

export const subCategoryModel = model<SubCategories>(
  "sub_categories",
  subCategorySchema
);
