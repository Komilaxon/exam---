"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workSchema = void 0;
const mongoose_1 = require("mongoose");
exports.workSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    title: String,
    caption: String,
    image: String,
    offers_count: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    sum: Number,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    categories: { type: mongoose_1.Schema.Types.ObjectId, ref: "categories" },
});
