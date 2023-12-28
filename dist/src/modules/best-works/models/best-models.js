"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestWorkModel = void 0;
const mongoose_1 = require("mongoose");
const best_schema_js_1 = require("../schema/best-schema.js");
exports.bestWorkModel = (0, mongoose_1.model)("bestworks", best_schema_js_1.bestWorkSchema);
