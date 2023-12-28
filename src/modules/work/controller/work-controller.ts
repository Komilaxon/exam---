import { Request, Response, NextFunction } from "express";
import { workModel } from "../models/work-model.js";
import { userModel } from "../../user/model/user-model.js";
import { categoryModel } from "../../categories/models/categories-model.js";

class WorkController {
  async getWork(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page, limit }: any = req.query;
      const Cpage = parseInt(page) || 1;
      const Climit = parseInt(limit) || 10;

      const startIndex = (Cpage - 1) * Climit;
      const endIndex = Cpage * Climit;

      const results: any = {};
      results.results = await workModel
        .find()
        .limit(Climit)
        .skip(startIndex)
        .populate("categories")
        .populate("user")
        .exec();

      if (endIndex < (await workModel.countDocuments().exec())) {
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

      const error: any = new Error();
      if (!results) {
        error.message = "Works are not found";
        error.code = 404;
        next(error);
        return;
      }

      res.status(200).json({ msg: "OK", data: results, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async getWorksByTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.params;
      const error: any = new Error();
      const work = (await workModel.find()).filter(
        (item) => item.title == title
      );

      if (!work) {
        (error.message = "Title is not found"), (error.code = 404), next(error);
        return;
      }
      res.status(200).json({ msg: "OK", data: work, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async getBestWorks(req: Request, res: Response, next: NextFunction) {
    try {
      const error: any = new Error();
      const totalOfferCount = 10;
      const works = (await workModel.find()).filter(
        (item) => item.offers_count >= totalOfferCount
      );
      if (!works) {
        (error.message = "Work is not found"), (error.code = 404);
        next(error);
        return;
      }

      res.status(201).json({ msg: "SUCCESS...", data: works, error: false });
    } catch (error: any) {
      (error.code = 500), next(error);
    }
  }

  async getWorkBySum(req: Request, res: Response, next: NextFunction) {
    try {
      const { from, to } = req.query;
      const error: any = new Error();
      const findedWorksBySum = await workModel.find({
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
    } catch (error: any) {
      error.code = 500;
      next(500);
    }
  }

  async createWork(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { categories } = req.body;

      const findCategory = await categoryModel.findOne({ _id: categories });
      const user = await userModel.findOne({ _id: id });

      const error: any = new Error();

      if (!user) {
        error.message = "Not found";
        error.code = 404;
        next(error);
        return;
      }
      const works = await new workModel({
        image: req.file?.filename,
        title: req.body.title,
        caption: req.body.caption,
        sum: req.body.sum,
        rating: req.body.rating,
        categories: findCategory,
        user: user,
      }).populate("categories");

      await works.save();

      res.status(201).json({ msg: "CREATED", data: works, error: false });
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }

  async updateWork(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const error: any = new Error();
      const work = await workModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!work) {
        (error.message = "Work is not found"), (error.code = 404), next(error);
        return;
      }

      res.status(200).json({ msg: "UPDATED", data: work, error: false });
    } catch (error: any) {
      error.code = 500;
      next(500);
    }
  }

  async upDateOfferCount(req: Request, res: Response, next: NextFunction) {
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
      const work = await workModel.findOne({ _id: id });

      if (!work) {
        const error: any = new Error();
        (error.message = "Work is not found"), (error.code = 400), next(error);
        return;
      }

      const updatedWork = await workModel.findByIdAndUpdate(
        { _id: id },
        { $set: { rating: result }, $inc: { offers_count: 1 } },
        { new: true }
      );

      res.status(200).json({
        msg: "Offer_count and ratings are updated",
        data: updatedWork,
        error: false,
      });
    } catch (error: any) {
      (error.code = 500), next(error);
    }
  }
}
export default new WorkController();
