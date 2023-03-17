import express from "express";
import { GetAllHouses, GetSingleHouse, SeeAllUsers, SingleAgentHouse, UploadHouses } from "../Controllers/HouseControllers";

const HouseRouter = express.Router();

HouseRouter.route("/getallhouses").get(GetAllHouses)
HouseRouter.route("/getonehouses").get(GetSingleHouse)
HouseRouter.route("/uploadhouse/:agentID").post(UploadHouses)
HouseRouter.route("/seeallusers").get(SeeAllUsers);
HouseRouter.route("/gethouse/:agentID").get(SingleAgentHouse)

export default HouseRouter;