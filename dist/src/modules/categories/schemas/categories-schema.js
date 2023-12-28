"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    subCategories: [{ type: mongoose_1.Types.ObjectId, ref: "sub_categories" }],
});
