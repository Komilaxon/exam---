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
const mongoose_1 = require("mongoose");
const jwt_js_1 = __importDefault(require("../../../utils/jwt.js"));
const user_model_js_1 = require("../../user/model/user-model.js");
const bcrypt_hook_js_1 = __importDefault(require("../../../utils/bcrypt-hook.js"));
const constants_js_1 = require("../../../utils/constants.js");
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_js_1.userModel.findOne({ email });
                const comparedPass = bcrypt_hook_js_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password);
                const error = new Error();
                if (!user || !comparedPass) {
                    error.message = "User is not found";
                    error.code = 404;
                    next(error);
                    return;
                }
                const TOKEN = jwt_js_1.default.sign({ id: user._id, isAdmin: user.isAdmin });
                res.status(200).json({ msg: "OK", data: TOKEN, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.password = bcrypt_hook_js_1.default.hashSync(req.body.password, constants_js_1.saltOrRounds);
                const { fullname, password, email, lastname, phone } = req.body;
                const user = yield user_model_js_1.userModel.create({
                    fullname,
                    email,
                    password,
                    lastname,
                    phone,
                });
                const TOKEN = jwt_js_1.default.sign({ id: user._id, isAdmin: user.isAdmin });
                res.status(201).json({ msg: "CREATED", data: TOKEN, error: false });
            }
            catch (error) {
                if (error instanceof mongoose_1.mongo.MongoServerError) {
                    const error = new Error();
                    error.message = "User is already exist";
                    error.code = 409;
                    next(error);
                    return;
                }
                error.code = 500;
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
