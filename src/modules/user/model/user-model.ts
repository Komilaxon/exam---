import { model } from "mongoose";
import { userSchema, User } from "../schema/user-schema.js";

export const userModel =  model<User>("users", userSchema);
