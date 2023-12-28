"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workModel = void 0;
const mongoose_1 = require("mongoose");
const work_schema_js_1 = require("../schema/work-schema.js");
exports.workModel = (0, mongoose_1.model)("works", work_schema_js_1.workSchema);
