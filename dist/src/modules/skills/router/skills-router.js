"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillsRouter = void 0;
const express_1 = require("express");
const skills_controller_js_1 = __importDefault(require("../controller/skills-controller.js"));
exports.skillsRouter = (0, express_1.Router)();
exports.skillsRouter.get("/skills", skills_controller_js_1.default.getSkills);
exports.skillsRouter.post("/skills/:id", skills_controller_js_1.default.createSkills);
