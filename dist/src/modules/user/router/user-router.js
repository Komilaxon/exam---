"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const user_controller_js_1 = __importDefault(require("../controller/user-controller.js"));
const auth_middle_js_1 = __importDefault(require("../../auth/middlewares/auth-middle.js"));
const multer_js_1 = require("../../../utils/multer.js");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get("/users", user_controller_js_1.default.getUser);
exports.usersRouter.get("/getme", auth_middle_js_1.default.checkToken, user_controller_js_1.default.getMe);
exports.usersRouter.put("/users/:id", auth_middle_js_1.default.checkToken, multer_js_1.upload.single("image"), user_controller_js_1.default.upDateUser);
