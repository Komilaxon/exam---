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
class BestMiddle {
    checkBestWorksBody(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalRating = 4;
                const error = new Error();
                if (!req.body.works || !req.body.caption) {
                    (error.message = "Invalid body"), (error.code = 400), next(error);
                    return;
                }
                next();
            }
            catch (error) {
                (error.code = 500), next(500);
            }
        });
    }
}
exports.default = new BestMiddle();
