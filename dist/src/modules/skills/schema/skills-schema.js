"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.skillsSchema = new mongoose_1.Schema({
    name: String,
    subCategory: { type: mongoose_1.Schema.Types.ObjectId, ref: "sub_categories" },
});
