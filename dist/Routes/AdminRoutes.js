"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminControllers_1 = require("../Controllers/AdminControllers");
const AdminRouter = express_1.default.Router();
AdminRouter.route("/registeradmin").post(AdminControllers_1.AdminRegistration);
AdminRouter.route("/loginadmin").post(AdminControllers_1.AdminLogin);
AdminRouter.route("/seeallusers/:adminID").get(AdminControllers_1.AdminSeeAllUsers);
AdminRouter.route("/seeallagents/:adminID").get(AdminControllers_1.AdminSeeAllAgents);
exports.default = AdminRouter;
