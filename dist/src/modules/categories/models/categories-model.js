"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const categories_schema_js_1 = require("../schemas/categories-schema.js");
exports.categoryModel = (0, mongoose_1.model)("categories", categories_schema_js_1.categorySchema);
