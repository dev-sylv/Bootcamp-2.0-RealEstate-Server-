"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../Config/multer");
const HouseControllers_1 = require("../Controllers/HouseControllers");
const HouseRouter = express_1.default.Router();
HouseRouter.route("/getallhouses").get(HouseControllers_1.GetAllHouses);
HouseRouter.route("/getonehouses").get(HouseControllers_1.GetSingleHouse);
HouseRouter.route("/uploadhouse/:agentID").post(multer_1.HouseUploads, HouseControllers_1.UploadHouses);
HouseRouter.route("/views/:id").patch(HouseControllers_1.UsersViewOfHouses);
HouseRouter.route("/housesearch").get(HouseControllers_1.QuerySearchforHouse);
exports.default = HouseRouter;
