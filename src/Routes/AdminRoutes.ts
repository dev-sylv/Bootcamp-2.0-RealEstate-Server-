import express from "express";

import { AdminLogin, AdminRegistration, AdminSeeAllAgents, AdminSeeAllUsers } from "../Controllers/AdminControllers";

const AdminRouter = express.Router();

AdminRouter.route("/registeradmin").post(AdminRegistration)
AdminRouter.route("/loginadmin").post(AdminLogin)
AdminRouter.route("/seeallusers/:adminID").get(AdminSeeAllUsers)
AdminRouter.route("/seeallagents/:adminID").get(AdminSeeAllAgents)

export default AdminRouter;