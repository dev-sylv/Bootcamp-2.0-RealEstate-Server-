import express from "express";

import { UserUploads} from "../Config/multer"

import { GetAllUsers, GetOneUser, UsersLogin, UsersRegistration, UsersToSeeAllHouse } from "../Controllers/UsersControllers";

const UserRouter = express.Router();

UserRouter.route("/registeruser").post(UserUploads, UsersRegistration)
UserRouter.route("/loginuser").post(UsersLogin)
UserRouter.route("/userseeallhouses/:userID").get(UsersToSeeAllHouse)
UserRouter.route("/getallusers").get(GetAllUsers);
UserRouter.route("/getuser/:userID").get(GetOneUser)

export default UserRouter;