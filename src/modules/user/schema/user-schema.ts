import { Schema, Types } from "mongoose";
import { Skill } from "../../skills/schema/skills-schema.js";
import { Categories } from "../../categories/schemas/categories-schema.js";

export interface User {
  fullname: string;
  lastname: string;
  email: string;
  password: any;
  phone: string;
  isAdmin: boolean;
  image: string;
  info: string;
  region: string;
  in_site: Date | string;
  study: string;
  rating: number;
  sertificate: string;
  language: string;
  categories: Categories;
  skills: Array<Skill>;
}

export const userSchema = new Schema<User>({
  fullname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: null,
  },
  info: {
    type: String,
    default: null,
  },
  region: {
    type: String,
    default: null,
  },
  in_site: {
    type: String,
    default: Date.now(),
  },
  study: {
    type: String,
    default: null,
  },
  sertificate: {
    type: String,
    default: null,
  },
  language: {
    type: String,
    default: null,
  },

  categories: { type: Schema.Types.ObjectId, ref: "categories" },
  skills: [{ type: Schema.Types.ObjectId, ref: "skills" }],
});
