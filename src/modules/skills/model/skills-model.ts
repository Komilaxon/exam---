import { model } from "mongoose";
import { skillsSchema, Skill } from "../schema/skills-schema.js";

export const skillsModel = model<Skill>("skills", skillsSchema);
