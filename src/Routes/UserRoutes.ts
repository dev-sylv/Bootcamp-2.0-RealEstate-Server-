import express from "express";

import { UserUploads} from "../Config/multer"

import { UsersLogin, UsersRegistration, UsersToSeeAllHouse } from "../Controllers/UsersControllers";

const UserRouter = express.Router();

UserRouter.route("/registeruser").post(UserUploads, UsersRegistration)
UserRouter.route("/loginuser").post(UsersLogin)
UserRouter.route("/userseeallhouses/:userID").get(UsersToSeeAllHouse)

export default UserRouter;