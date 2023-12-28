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
const skills_model_js_1 = require("../model/skills-model.js");
const subcategory_model_js_1 = require("../../subcategories/models/subcategory.model.js");
class SkillsController {
    getSkills(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skills = yield skills_model_js_1.skillsModel.find();
                res.status(200).json({ msg: "OK", data: skills, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    createSkills(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield subcategory_model_js_1.subCategoryModel.findOne({ _id: id });
                const error = new Error();
                if (!category) {
                    error.message = "Not found";
                    error.code = 404;
                    next(error);
                    return;
                }
                const skills = yield new skills_model_js_1.skillsModel({
                    name: req.body.name,
                    category: new mongoose_1.Types.ObjectId(category._id),
                }).save();
                (_a = category.skills) === null || _a === void 0 ? void 0 : _a.push(skills);
                yield category.save();
                res.status(201).json({ msg: "CREATED", data: skills, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
}
exports.default = new SkillsController();
