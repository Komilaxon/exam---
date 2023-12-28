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
const best_models_js_1 = require("../models/best-models.js");
const work_model_js_1 = require("../../work/models/work-model.js");
class BestWorksController {
    getBestWorks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bestWorks = yield best_models_js_1.bestWorkModel.find().populate("works").exec();
                res.status(500).json({ msg: "OK", data: bestWorks, error: false });
            }
            catch (error) {
                error.code = 500;
                next(error);
            }
        });
    }
    createBestWorks(req, res, next) {
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
                const bestWork = yield best_models_js_1.bestWorkModel.create({
                    caption: req.body.caption,
                    works: works,
                });
                res.status(201).json({ msg: "CREATED", data: bestWork, error: false });
            }
            catch (error) {
                (error.code = 500), next(error);
            }
        });
    }
}
exports.default = new BestWorksController();
