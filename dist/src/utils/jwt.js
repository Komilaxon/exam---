"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtHelper {
    sign(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY);
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    }
}
exports.default = new JwtHelper();
