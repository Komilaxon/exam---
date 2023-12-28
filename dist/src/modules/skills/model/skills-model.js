"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillsModel = void 0;
const mongoose_1 = require("mongoose");
const skills_schema_js_1 = require("../schema/skills-schema.js");
exports.skillsModel = (0, mongoose_1.model)("skills", skills_schema_js_1.skillsSchema);
