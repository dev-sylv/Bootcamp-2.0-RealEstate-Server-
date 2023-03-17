"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../Config/multer");
const UsersControllers_1 = require("../Controllers/UsersControllers");
const UserRouter = express_1.default.Router();
UserRouter.route("/registeruser").post(multer_1.UserUploads, UsersControllers_1.UsersRegistration);
UserRouter.route("/loginuser").post(UsersControllers_1.UsersLogin);
UserRouter.route("/userseeallhouses/:userID").get(UsersControllers_1.UsersToSeeAllHouse);
exports.default = UserRouter;
