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
const categories_model_js_1 = require("../../categories/models/categories-model.js");
const subcategory_model_js_1 = require("../models/subcategory.model.js");
class SubCategoriesController {
    getSubCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategories = yield subcategory_model_js_1.subCategoryModel
                    .find()
                    .populate("skills")
                    .exec();
                res.status(200).json({ msg: "OK", data: subCategories, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    createSubCategory(req, res, next) {
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
                const subCategories = yield new subcategory_model_js_1.subCategoryModel({
                    name: req.body.name,
                    category: new mongoose_1.Types.ObjectId(category._id),
                }).save();
                (_a = category.subCategories) === null || _a === void 0 ? void 0 : _a.push(subCategories);
                yield category.save();
                res
                    .status(201)
                    .json({ msg: "CREATED", data: subCategories, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
}
exports.default = new SubCategoriesController();
