"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.subCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    skills: [{ type: mongoose_1.Types.ObjectId, ref: "skills" }],
});
