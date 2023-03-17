import express from "express";

import { AgentLogin, AgentRegistration, GetAllAgents, GetOneAgent, SeeAllUsers, SingleAgentHouse } from "../Controllers/AgentControllers";

const AgentRouter = express.Router();

AgentRouter.route("/registeragents").post(AgentRegistration)
AgentRouter.route("/loginagents").post(AgentLogin)
AgentRouter.route("/getagents").get(GetAllAgents)
AgentRouter.route("/getagents/:agentID").get(GetOneAgent)
AgentRouter.route("/seeallusers/:agentID").get(SeeAllUsers);
AgentRouter.route("/gethouse/:agentID").get(SingleAgentHouse);


export default AgentRouter;