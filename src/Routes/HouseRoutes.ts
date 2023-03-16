import express from "express";
import { GetAllHouses, GetSingleHouse } from "../Controllers/HouseControllers";

const HouseRouter = express.Router();

HouseRouter.route("/getallhouses").get(GetAllHouses)
HouseRouter.route("/getonehouses").get(GetSingleHouse)

export default HouseRouter;