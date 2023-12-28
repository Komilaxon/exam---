import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt from "../../../utils/jwt.js";

interface IUserToken {
  email: string;
  isAdmin: boolean;
}

class AuthMiddle {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullname, email, password } = req.body;
      const pattern = /^[0-9A-Za-z]{6,16}\d+$/;
      const emailPat =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.com$/;
      const error: any = new Error();

      if (
        !fullname &&
        !email &&
        password! > 5 &&
        !pattern.test(fullname) &&
        !emailPat.test(email)
      ) {
        error.message = "Invalid body";
        error.code = 400;
        next(error);
        return;
      }
      next();
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }


  async checkToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers["authorization"] || "";
      if (!token) {
        const error: any = new Error();
        error.message = "No token";
        error.code = 401;
        next(error);
      }
      const user = jwt.verify(token) as IUserToken;
      req.user = user;

      next();
    } catch (error: any) {
      error.code = 500;
      next(error);
    }
  }
}

export default new AuthMiddle();
