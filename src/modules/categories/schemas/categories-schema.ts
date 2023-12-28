import { Schema, Types } from "mongoose";
import { SubCategories } from "../../subcategories/schema/subcategories.schema.js";

export interface Categories {
  name: string;
  subCategories?: Array<SubCategories>;
}

export const categorySchema = new Schema<Categories>({
  name: {
    type: String,
    required: true,
  },
  subCategories: [{ type: Types.ObjectId, ref: "sub_categories" }],
});
