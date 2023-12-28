"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const user_schema_js_1 = require("../schema/user-schema.js");
exports.userModel = (0, mongoose_1.model)("users", user_schema_js_1.userSchema);
