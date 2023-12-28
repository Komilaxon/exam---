import "dotenv/config";
import path from "path";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { dbConnection } from "./utils/db-connect.js";
import { authRouter } from "./modules/auth/router/auth-router.js";
import { usersRouter } from "./modules/user/router/user-router.js";
import { categoriesRouter } from "./modules/categories/router/categories-router.js";
import { skillsRouter } from "./modules/skills/router/skills-router.js";
import { worksRouter } from "./modules/work/router/work-router.js";
import { subCategoriesRouter } from "./modules/subcategories/router/subcategory.router.js";

declare global {
  namespace Express {
    interface Request {
      user: Object;
    }
  }
}

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

export const server = async (): Promise<void> => {
  try {
    const app: Application = express();
    app.use(express.json());

    await dbConnection();

    // Enable cors
    app.use(cors(corsOptions));

    // Routers
    app.use(authRouter);
    app.use(usersRouter);
    app.use(categoriesRouter);
    app.use(subCategoriesRouter);
    app.use(skillsRouter);
    app.use(worksRouter);

    // Error handling

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      res.status(error.code).json({ error: error.message });
      next();
    });

    app.use(express.static(path.join(path.resolve(), "uploads")));

    // App port
    app.listen(process.env.APP_PORT, () =>
      console.log("server is running on port: " + process.env.APP_PORT)
    );
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
};

server();
