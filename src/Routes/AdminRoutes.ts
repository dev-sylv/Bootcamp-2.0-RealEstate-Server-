import express from "express";

import { AdminLogin } from "../Controllers/AdminControllers";

const AdminRouter = express.Router();

AdminRouter.route("/loginagents").post(AdminLogin)

export default AdminRouter;