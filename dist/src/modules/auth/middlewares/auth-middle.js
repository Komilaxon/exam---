"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_js_1 = __importDefault(require("../../../utils/jwt.js"));
class AuthMiddle {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullname, email, password } = req.body;
                const pattern = /^[0-9A-Za-z]{6,16}\d+$/;
                const emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.com$/;
                const error = new Error();
                if (!fullname &&
                    !email &&
                    password > 5 &&
                    !pattern.test(fullname) &&
                    !emailPat.test(email)) {
                    error.message = "Invalid body";
                    error.code = 400;
                    next(error);
                    return;
                }
                next();
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"] || "";
                if (!token) {
                    const error = new Error();
                    error.message = "No token";
                    error.code = 401;
                    next(error);
                }
                const user = jwt_js_1.default.verify(token);
                req.user = user;
                next();
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
}
exports.default = new AuthMiddle();
