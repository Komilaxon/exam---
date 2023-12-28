import { Request, Response, NextFunction } from "express";
import { userModel } from "../model/user-model.js";
import { skillsModel } from "../../skills/model/skills-model.js";
import { categoryModel } from "../../categories/models/categories-model.js";
import { Skill } from "../../skills/schema/skills-schema.js";

class UserController {
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await userModel
        .find()
        .populate("skills")
        .populate("categories")
        .exec();
      res.status(200).json({ msg: "OK", data: users, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async upDateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userModel.findById({ _id: id });
      const { category_name } = req.body;
      const findedCategory = await categoryModel.findOne({
        _id: category_name,
      });

      if (!user) {
        const error: any = new Error();
        (error.message = "User is not found"), (error.code = 404), next(error);
        return;
      }

      // skills array bo'lganligi uchun
      const userSkillId = req.body.skills;
      let skillNames: Skill[] = [];
      if (userSkillId) {
        if (typeof userSkillId === "string") {
          const res = await skillsModel.findById({ _id: userSkillId });
          if (res) {
            if (!user?.skills.includes(res.toJSON())) {
              skillNames.push(res.toJSON());
            }
          }
        } else {
          for (let i = 0; i < userSkillId.length; i++) {
            const res = await skillsModel.findById({ _id: userSkillId[i] });
            if (res) {
              if (!user?.skills.includes(res.toJSON())) {
                skillNames.push(res.toJSON());
              } else {
                skillNames;
              }
            }
          }
        }
      }

      if (user?.skills.length != 0) {
        const oldSkills = user?.skills;
        skillNames = [...(oldSkills || []), ...skillNames];
      }

      const users = await userModel
        .findByIdAndUpdate(
          id,
          {
            image: req.file?.filename || user?.image,
            info: req.body.info || user?.info,
            region: req.body.region || user?.region,
            in_site: req.body.in_site || user?.in_site,
            isAdmin: req.body.isAdmin || user?.isAdmin,
            study: req.body.study || user?.study,
            sertificate: req.body.sertificate || user?.sertificate,
            language: req.body.language || user?.language,
            category_name: findedCategory?.name,
            skills: skillNames,
          },
          { new: true }
        )
        .populate("skills");

      res.status(201).json({ msg: "UPDATED", data: users, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.headers;
      const findedUser = await userModel.findOne({ id }).populate("skills");
      res.status(200).json({ msg: "SUCCESS", data: findedUser, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
}

export default new UserController();
