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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_connect_js_1 = require("./utils/db-connect.js");
const auth_router_js_1 = require("./modules/auth/router/auth-router.js");
const user_router_js_1 = require("./modules/user/router/user-router.js");
const categories_router_js_1 = require("./modules/categories/router/categories-router.js");
const skills_router_js_1 = require("./modules/skills/router/skills-router.js");
const work_router_js_1 = require("./modules/work/router/work-router.js");
const subcategory_router_js_1 = require("./modules/subcategories/router/subcategory.router.js");
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        yield (0, db_connect_js_1.dbConnection)();
        // Enable cors
        app.use((0, cors_1.default)(corsOptions));
        // Routers
        app.use(auth_router_js_1.authRouter);
        app.use(user_router_js_1.usersRouter);
        app.use(categories_router_js_1.categoriesRouter);
        app.use(subcategory_router_js_1.subCategoriesRouter);
        app.use(skills_router_js_1.skillsRouter);
        app.use(work_router_js_1.worksRouter);
        // Error handling
        app.use((error, req, res, next) => {
            res.status(error.code).json({ error: error.message });
            next();
        });
        app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "uploads")));
        // App port
        app.listen(process.env.APP_PORT, () => console.log("server is running on port: " + process.env.APP_PORT));
    }
    catch (error) {
        console.error(error);
        process.exit(-1);
    }
});
exports.server = server;
(0, exports.server)();
