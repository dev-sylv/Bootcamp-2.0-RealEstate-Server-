import express from "express";

import { AdminLogin, AdminRegistration } from "../Controllers/AdminControllers";

const AdminRouter = express.Router();

AdminRouter.route("/registeradmin").post(AdminRegistration)
AdminRouter.route("/loginadmin").post(AdminLogin)

export default AdminRouter;