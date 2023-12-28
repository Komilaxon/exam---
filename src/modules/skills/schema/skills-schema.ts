import { Schema, Types } from "mongoose";

export interface Skill {
  name: string;
  subCategory?: Types.ObjectId;
}

export const skillsSchema = new Schema({
  name: String,
  subCategory: { type: Schema.Types.ObjectId, ref: "sub_categories" },
});
