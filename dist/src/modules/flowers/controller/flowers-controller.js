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
const mongoose_1 = require("mongoose");
const flowers_model_js_1 = require("../models/flowers-model.js");
const categories_model_js_1 = require("../../categories/models/categories-model.js");
class FlowersController {
    getFlo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flowers = yield flowers_model_js_1.flowersModel.find();
                res.status(200).json({ msg: "OK", data: flowers, error: false });
            }
            catch (error) {
                res.status(500).json({ msg: error.message, data: null, error: true });
            }
        });
    }
    createFLo(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield categories_model_js_1.categoryModel.findOne({ _id: id });
                const error = new Error();
                if (!category) {
                    error.message = "Not found";
                    error.code = 404;
                    next(error);
                    return;
                }
                const flowers = yield new flowers_model_js_1.flowersModel({
                    name: req.body.name,
                    price: req.body.price,
                    image: "123",
                    category: new mongoose_1.Types.ObjectId(category._id),
                }).save();
                (_a = category.flowers) === null || _a === void 0 ? void 0 : _a.push(flowers);
                console.log(category);
                yield category.save();
                res.status(201).json({ msg: "CREATED", data: flowers, error: false });
            }
            catch (error) {
                res.status(500).json({ msg: error.message, data: null, error: true });
            }
        });
    }
}
exports.default = new FlowersController();
