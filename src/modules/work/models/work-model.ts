import { model } from "mongoose";
import { workSchema, Work } from "../schema/work-schema.js";

export const workModel = model<Work>("works", workSchema);
