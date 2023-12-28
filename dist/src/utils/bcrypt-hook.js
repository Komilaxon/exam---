"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class BcryptHelper {
    hashSync(password, saltOrRounds) {
        return bcryptjs_1.default.hashSync(password, saltOrRounds);
    }
    compareSync(originalPass, hashedPass) {
        return bcryptjs_1.default.compareSync(originalPass, hashedPass);
    }
}
exports.default = new BcryptHelper();
