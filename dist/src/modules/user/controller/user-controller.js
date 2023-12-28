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
const user_model_js_1 = require("../model/user-model.js");
const skills_model_js_1 = require("../../skills/model/skills-model.js");
const categories_model_js_1 = require("../../categories/models/categories-model.js");
class UserController {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_js_1.userModel
                    .find()
                    .populate("skills")
                    .populate("categories")
                    .exec();
                res.status(200).json({ msg: "OK", data: users, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    upDateUser(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_model_js_1.userModel.findById({ _id: id });
                const { category_name } = req.body;
                const findedCategory = yield categories_model_js_1.categoryModel.findOne({
                    _id: category_name,
                });
                if (!user) {
                    const error = new Error();
                    (error.message = "User is not found"), (error.code = 404), next(error);
                    return;
                }
                // skills array bo'lganligi uchun
                const userSkillId = req.body.skills;
                let skillNames = [];
                if (userSkillId) {
                    if (typeof userSkillId === "string") {
                        const res = yield skills_model_js_1.skillsModel.findById({ _id: userSkillId });
                        if (res) {
                            if (!(user === null || user === void 0 ? void 0 : user.skills.includes(res.toJSON()))) {
                                skillNames.push(res.toJSON());
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < userSkillId.length; i++) {
                            const res = yield skills_model_js_1.skillsModel.findById({ _id: userSkillId[i] });
                            if (res) {
                                if (!(user === null || user === void 0 ? void 0 : user.skills.includes(res.toJSON()))) {
                                    skillNames.push(res.toJSON());
                                }
                                else {
                                    skillNames;
                                }
                            }
                        }
                    }
                }
                if ((user === null || user === void 0 ? void 0 : user.skills.length) != 0) {
                    const oldSkills = user === null || user === void 0 ? void 0 : user.skills;
                    skillNames = [...(oldSkills || []), ...skillNames];
                }
                const users = yield user_model_js_1.userModel
                    .findByIdAndUpdate(id, {
                    image: ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || (user === null || user === void 0 ? void 0 : user.image),
                    info: req.body.info || (user === null || user === void 0 ? void 0 : user.info),
                    region: req.body.region || (user === null || user === void 0 ? void 0 : user.region),
                    in_site: req.body.in_site || (user === null || user === void 0 ? void 0 : user.in_site),
                    isAdmin: req.body.isAdmin || (user === null || user === void 0 ? void 0 : user.isAdmin),
                    study: req.body.study || (user === null || user === void 0 ? void 0 : user.study),
                    sertificate: req.body.sertificate || (user === null || user === void 0 ? void 0 : user.sertificate),
                    language: req.body.language || (user === null || user === void 0 ? void 0 : user.language),
                    category_name: findedCategory === null || findedCategory === void 0 ? void 0 : findedCategory.name,
                    skills: skillNames,
                }, { new: true })
                    .populate("skills");
                res.status(201).json({ msg: "UPDATED", data: users, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    getMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.headers;
                const findedUser = yield user_model_js_1.userModel.findOne({ id }).populate("skills");
                res.status(200).json({ msg: "SUCCESS", data: findedUser, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
}
exports.default = new UserController();
