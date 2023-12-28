import { Schema, Types } from "mongoose";
import { Skill } from "../../skills/schema/skills-schema.js";

export interface SubCategories {
  name: string;
  skills?: Array<Skill>;
}

export const subCategorySchema = new Schema<SubCategories>({
  name: {
    type: String,
    required: true,
  },
  skills: [{ type: Types.ObjectId, ref: "skills" }],
});
