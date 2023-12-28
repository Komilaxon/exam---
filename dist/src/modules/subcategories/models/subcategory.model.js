"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const subcategories_schema_1 = require("../../subcategories/schema/subcategories.schema");
exports.subCategoryModel = (0, mongoose_1.model)("sub_categories", subcategories_schema_1.subCategorySchema);
