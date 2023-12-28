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
const work_model_js_1 = require("../models/work-model.js");
const user_model_js_1 = require("../../user/model/user-model.js");
const categories_model_js_1 = require("../../categories/models/categories-model.js");
class WorkController {
    getWork(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = req.query;
                const Cpage = parseInt(page) || 1;
                const Climit = parseInt(limit) || 10;
                const startIndex = (Cpage - 1) * Climit;
                const endIndex = Cpage * Climit;
                const results = {};
                results.results = yield work_model_js_1.workModel
                    .find()
                    .limit(Climit)
                    .skip(startIndex)
                    .populate("categories")
                    .populate("user")
                    .exec();
                if (endIndex < (yield work_model_js_1.workModel.countDocuments().exec())) {
                    results.next = {
                        page: Cpage + 1,
                        limit: Climit,
                    };
                }
                if (startIndex > 0) {
                    results.previous = {
                        page: Cpage - 1,
                        limit: Climit,
                    };
                }
                const error = new Error();
                if (!results) {
                    error.message = "Works are not found";
                    error.code = 404;
                    next(error);
                    return;
                }
                res.status(200).json({ msg: "OK", data: results, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    getWorksByTitle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.params;
                const error = new Error();
                const work = (yield work_model_js_1.workModel.find()).filter((item) => item.title == title);
                if (!work) {
                    (error.message = "Title is not found"), (error.code = 404), next(error);
                    return;
                }
                res.status(200).json({ msg: "OK", data: work, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    getBestWorks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = new Error();
                const totalOfferCount = 10;
                const works = (yield work_model_js_1.workModel.find()).filter((item) => item.offers_count >= totalOfferCount);
                if (!works) {
                    (error.message = "Work is not found"), (error.code = 404);
                    next(error);
                    return;
                }
                res.status(201).json({ msg: "SUCCESS...", data: works, error: false });
            }
            catch (error) {
                (error.code = 500), next(error);
            }
        });
    }
    getWorkBySum(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { from, to } = req.query;
                const error = new Error();
                const findedWorksBySum = yield work_model_js_1.workModel.find({
                    sum: { $gt: from, $lt: to },
                });
                if (!findedWorksBySum) {
                    error.message = "Work is not found";
                    error.code = 404;
                    next(error);
                    return;
                }
                res
                    .status(200)
                    .json({ msg: "SUCCESS", data: findedWorksBySum, error: false });
            }
            catch (error) {
                error.code = 500;
                next(500);
            }
        });
    }
    createWork(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { categories } = req.body;
                const findCategory = yield categories_model_js_1.categoryModel.findOne({ _id: categories });
                const user = yield user_model_js_1.userModel.findOne({ _id: id });
                const error = new Error();
                if (!user) {
                    error.message = "Not found";
                    error.code = 404;
                    next(error);
                    return;
                }
                const works = yield new work_model_js_1.workModel({
                    image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
                    title: req.body.title,
                    caption: req.body.caption,
                    sum: req.body.sum,
                    rating: req.body.rating,
                    categories: findCategory,
                    user: user,
                }).populate("categories");
                yield works.save();
                res.status(201).json({ msg: "CREATED", data: works, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    updateWork(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const error = new Error();
                const work = yield work_model_js_1.workModel.findByIdAndUpdate(id, req.body, {
                    new: true,
                });
                if (!work) {
                    (error.message = "Work is not found"), (error.code = 404), next(error);
                    return;
                }
                res.status(200).json({ msg: "UPDATED", data: work, error: false });
            }
            catch (error) {
                error.code = 500;
                next(500);
            }
        });
    }
    upDateOfferCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let totalRating = 0;
                let numberOfRating = 0;
                const { id } = req.params;
                const { rating } = req.body;
                if (rating >= 0 && rating <= 5) {
                    totalRating += rating;
                    numberOfRating++;
                }
                const result = totalRating / numberOfRating;
                // Find the work document
                const work = yield work_model_js_1.workModel.findOne({ _id: id });
                if (!work) {
                    const error = new Error();
                    (error.message = "Work is not found"), (error.code = 400), next(error);
                    return;
                }
                const updatedWork = yield work_model_js_1.workModel.findByIdAndUpdate({ _id: id }, { $set: { rating: result }, $inc: { offers_count: 1 } }, { new: true });
                res.status(200).json({
                    msg: "Offer_count and ratings are updated",
                    data: updatedWork,
                    error: false,
                });
            }
            catch (error) {
                (error.code = 500), next(error);
            }
        });
    }
}
exports.default = new WorkController();
