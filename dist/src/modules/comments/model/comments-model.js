"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsModel = void 0;
const mongoose_1 = require("mongoose");
const comments_schema_js_1 = require("../schema/comments-schema.js");
exports.commentsModel = (0, mongoose_1.model)("comments", comments_schema_js_1.commentSchema);
