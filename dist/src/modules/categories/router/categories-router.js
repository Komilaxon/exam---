"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = require("express");
const categories_controller_js_1 = __importDefault(require("../controller/categories-controller.js"));
const auth_middle_js_1 = __importDefault(require("../../auth/middlewares/auth-middle.js"));
exports.categoriesRouter = (0, express_1.Router)();
exports.categoriesRouter.get("/categories", categories_controller_js_1.default.getCategories);
exports.categoriesRouter.get("/categories/:name", categories_controller_js_1.default.getCategoryByName);
exports.categoriesRouter.post("/categories", auth_middle_js_1.default.checkToken, categories_controller_js_1.default.createCategory);
