"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestWorksRouter = void 0;
const express_1 = require("express");
const best_controller_js_1 = __importDefault(require("../controller/best-controller.js"));
const auth_middle_js_1 = __importDefault(require("../../auth/middlewares/auth-middle.js"));
exports.bestWorksRouter = (0, express_1.Router)();
exports.bestWorksRouter.get("/bestworks", best_controller_js_1.default.getBestWorks);
exports.bestWorksRouter.post("/bestworks", auth_middle_js_1.default.checkToken);
