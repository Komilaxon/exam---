"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
exports.commentsRouter = (0, express_1.Router)();
exports.commentsRouter.get("/comments");
exports.commentsRouter.post("/comments");
