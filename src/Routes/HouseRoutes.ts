import express from "express";
import { GetAllHouses, GetSingleHouse, UploadHouses } from "../Controllers/HouseControllers";

const HouseRouter = express.Router();

HouseRouter.route("/getallhouses").get(GetAllHouses)
HouseRouter.route("/getonehouses").get(GetSingleHouse)
HouseRouter.route("/uploadhouse/:agentID").post(UploadHouses)

export default HouseRouter;