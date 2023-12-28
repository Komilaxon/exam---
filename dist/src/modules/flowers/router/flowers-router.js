"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowersRouter = void 0;
const express_1 = require("express");
const flowers_controller_js_1 = __importDefault(require("../controller/flowers-controller.js"));
exports.flowersRouter = (0, express_1.Router)();
exports.flowersRouter.get("/flowers", flowers_controller_js_1.default.getFlo);
exports.flowersRouter.post("/flowers/:id", flowers_controller_js_1.default.createFLo);
