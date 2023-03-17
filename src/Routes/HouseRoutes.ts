import express from "express";
import { GetAllHouses, GetSingleHouse, UploadHouses, UsersViewOfHouses } from "../Controllers/HouseControllers";

const HouseRouter = express.Router();

HouseRouter.route("/getallhouses").get(GetAllHouses)
HouseRouter.route("/getonehouses").get(GetSingleHouse)
HouseRouter.route("/uploadhouse/:agentID").post(UploadHouses)
HouseRouter.route("/views/:id").patch(UsersViewOfHouses);

export default HouseRouter;