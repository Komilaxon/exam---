"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptHelper {
    hashSync(password, saltOrRounds) {
        return bcrypt_1.default.hashSync(password, saltOrRounds);
    }
    compareSync(originalPass, hashedPass) {
        return bcrypt_1.default.compareSync(originalPass, hashedPass);
    }
}
exports.default = new BcryptHelper();
