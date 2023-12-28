"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worksRouter = void 0;
const express_1 = require("express");
const multer_1 = require("../../../utils/multer");
const auth_middle_1 = __importDefault(require("../../auth/middlewares/auth-middle"));
const work_controller_js_1 = __importDefault(require("../controller/work-controller.js"));
exports.worksRouter = (0, express_1.Router)();
exports.worksRouter.get("/works", work_controller_js_1.default.getWork);
exports.worksRouter.get("/bestworks", work_controller_js_1.default.getBestWorks);
exports.worksRouter.get("/works/:title", work_controller_js_1.default.getWorksByTitle);
exports.worksRouter.get("/works/by_sum", work_controller_js_1.default.getWorkBySum);
exports.worksRouter.post("/works/:id", auth_middle_1.default.checkToken, multer_1.upload.single("image"), work_controller_js_1.default.createWork);
exports.worksRouter.patch("/works/:id", work_controller_js_1.default.upDateOfferCount);
exports.worksRouter.put("/works/:id", auth_middle_1.default.checkToken, work_controller_js_1.default.updateWork);
