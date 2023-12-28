import { model } from "mongoose";
import { categorySchema, Categories } from "../schemas/categories-schema.js";

export const categoryModel = model<Categories>("categories", categorySchema);
