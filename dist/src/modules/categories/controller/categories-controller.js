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
const categories_model_js_1 = require("../models/categories-model.js");
class CategoriesController {
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categories_model_js_1.categoryModel.find().exec();
                res.status(200).json({ msg: "OK", data: categories, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield new categories_model_js_1.categoryModel({
                    name: req.body.name,
                }).save();
                res.status(201).json({ msg: "CREATED", data: category, error: false });
            }
            catch (error) {
                res.status(500).json({ msg: error.message });
            }
        });
    }
    getCategoryByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const categoriesByName = yield categories_model_js_1.categoryModel.find({
                    name: { $regex: name, $options: "i" },
                });
                res.status(200).json({ msg: "OK", data: categoriesByName, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
}
exports.default = new CategoriesController();
