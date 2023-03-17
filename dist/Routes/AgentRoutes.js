"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AgentControllers_1 = require("../Controllers/AgentControllers");
const AgentRouter = express_1.default.Router();
AgentRouter.route("/registeragents").post(AgentControllers_1.AgentRegistration);
AgentRouter.route("/loginagents").post(AgentControllers_1.AgentLogin);
AgentRouter.route("/getagents").get(AgentControllers_1.GetAllAgents);
AgentRouter.route("/getagents/:agentID").get(AgentControllers_1.GetOneAgent);
AgentRouter.route("/seeallusers/:agentID").get(AgentControllers_1.SeeAllUsers);
AgentRouter.route("/gethouse/:agentID").get(AgentControllers_1.SingleAgentHouse);
exports.default = AgentRouter;
