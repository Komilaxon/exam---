"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestWorkSchema = void 0;
const mongoose_1 = require("mongoose");
exports.bestWorkSchema = new mongoose_1.Schema({
    caption: String,
    works: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "works" }],
});
