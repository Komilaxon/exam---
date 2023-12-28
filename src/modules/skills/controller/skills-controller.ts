import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { skillsModel } from "../model/skills-model.js";
import { subCategoryModel } from "../../subcategories/models/subcategory.model.js";

class SkillsController {
  async getSkills(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const skills = await skillsModel.find();
      res.status(200).json({ msg: "OK", data: skills, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
  async createSkills(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const category = await subCategoryModel.findOne({ _id: id });
      const error: any = new Error();

      if (!category) {
        error.message = "Not found";
        error.code = 404;
        next(error);
        return;
      }
      const skills = await new skillsModel({
        name: req.body.name,
        category: new Types.ObjectId(category._id),
      }).save();

      category.skills?.push(skills);

      await category.save();

      res.status(201).json({ msg: "CREATED", data: skills, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
}

export default new SkillsController();
