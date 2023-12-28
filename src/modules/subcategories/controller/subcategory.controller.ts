import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { categoryModel } from "../../categories/models/categories-model.js";
import { subCategoryModel } from "../models/subcategory.model.js";

class SubCategoriesController {
  async getSubCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const subCategories = await subCategoryModel
        .find()
        .populate("skills")
        .exec();
      res.status(200).json({ msg: "OK", data: subCategories, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async createSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await categoryModel.findOne({ _id: id });
      const error: any = new Error();

      if (!category) {
        error.message = "Not found";
        error.code = 404;
        next(error);
        return;
      }
      const subCategories = await new subCategoryModel({
        name: req.body.name,
        category: new Types.ObjectId(category._id),
      }).save();

      category.subCategories?.push(subCategories);

      await category.save();

      res
        .status(201)
        .json({ msg: "CREATED", data: subCategories, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
}
export default new SubCategoriesController();
