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
Object.defineProperty(exports, "__esModule", { value: true });
const categories_model_js_1 = require("../../categories/models/categories-model.js");
class WorkMiddle {
    checkWorkBody(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = new Error();
                if (!req.body.category ||
                    !req.body.offers_count ||
                    isNaN(+req.body.offers_count)) {
                    error.code = 400;
                    error.message = "Invalid body";
                    next(error);
                    return;
                }
                if (!req.user) {
                    error.code = 404;
                    error.message = "User is not found";
                    next(error);
                    return;
                }
                const category = yield categories_model_js_1.categoryModel.findOne({ id: req.body.category });
                if (!category) {
                    error.message = "Category is not found";
                    error.code = 404;
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
}
exports.default = new WorkMiddle();
