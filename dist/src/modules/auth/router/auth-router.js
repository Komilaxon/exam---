"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_js_1 = __importDefault(require("../controller/auth-controller.js"));
const auth_middle_js_1 = __importDefault(require("../middlewares/auth-middle.js"));
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/login", auth_controller_js_1.default.login);
exports.authRouter.post("/register", auth_middle_js_1.default.signUp, auth_controller_js_1.default.register);
