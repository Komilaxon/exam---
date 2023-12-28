"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.commentSchema = new mongoose_1.Schema({
    title: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    work: { type: mongoose_1.Schema.Types.ObjectId, ref: "works" },
});
