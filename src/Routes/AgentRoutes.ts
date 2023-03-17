import express from "express";

import { AgentLogin, AgentRegistration } from "../Controllers/AgentControllers";

const AgentRouter = express.Router();

AgentRouter.route("/registeragents").post(AgentRegistration)
AgentRouter.route("/loginagents").post(AgentLogin)

export default AgentRouter;