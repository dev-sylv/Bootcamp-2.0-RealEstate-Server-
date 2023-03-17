import express from "express";
import { HouseUploads } from "../Config/multer";
import { GetAllHouses, GetSingleHouse, QuerySearchforHouse, UploadHouses, UsersViewOfHouses } from "../Controllers/HouseControllers";

const HouseRouter = express.Router();

HouseRouter.route("/getallhouses").get(GetAllHouses)
HouseRouter.route("/getonehouses").get(GetSingleHouse)
HouseRouter.route("/uploadhouse/:agentID").post(HouseUploads, UploadHouses)
HouseRouter.route("/views/:id").patch(UsersViewOfHouses);
HouseRouter.route("/housesearch").get(QuerySearchforHouse);

export default HouseRouter;