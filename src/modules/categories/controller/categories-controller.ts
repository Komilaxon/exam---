import { NextFunction, Request, Response } from "express";
import { categoryModel } from "../models/categories-model.js";

class CategoriesController {
  async getCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await categoryModel.find().exec();
      res.status(200).json({ msg: "OK", data: categories, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const category = await new categoryModel({
        name: req.body.name,
      }).save();

      res.status(201).json({ msg: "CREATED", data: category, error: false });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  }

  async getCategoryByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name } = req.params;
      const categoriesByName = await categoryModel.find({
        name: { $regex: name, $options: "i" },
      });

      res.status(200).json({ msg: "OK", data: categoriesByName, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
}

export default new CategoriesController();
