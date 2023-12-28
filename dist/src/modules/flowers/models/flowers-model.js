"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowersModel = void 0;
const mongoose_1 = require("mongoose");
const flowers_schema_1 = require("../schema/flowers-schema");
exports.flowersModel = (0, mongoose_1.model)("flowers", flowers_schema_1.flowersSchema);
