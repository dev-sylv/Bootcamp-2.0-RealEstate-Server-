"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleAgentHouse = exports.SeeAllUsers = exports.GetOneAgent = exports.GetAllAgents = exports.AgentLogin = exports.AgentRegistration = void 0;
const AsyncHandler_1 = require("../Utils/AsyncHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AgentModels_1 = __importDefault(require("../Models/AgentModels"));
const AppError_1 = require("../Utils/AppError");
// Agent Sign up:
exports.AgentRegistration = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, Bio, phoneno, password, role } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const Agent = yield AgentModels_1.default.create({
        name,
        email,
        Bio,
        phoneno: 234 + phoneno,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role,
    });
    if (Agent) {
        next(new AppError_1.AppError({
            message: "Agent with this account already exists",
            httpcode: AppError_1.HTTPCODES.FORBIDDEN
        }));
    }
    return res.status(201).json({
        message: "Successfully created Agent",
        data: Agent
    });
}));
// Agent Login:
exports.AgentLogin = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const CheckEmail = yield AgentModels_1.default.findOne({ email });
    if (!CheckEmail) {
        next(new AppError_1.AppError({
            message: "Agent not Found",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND
        }));
    }
    const CheckPassword = yield bcrypt_1.default.compare(password, CheckEmail.password);
    if (!CheckPassword) {
        next(new AppError_1.AppError({
            message: "Email or password not correct",
            httpcode: AppError_1.HTTPCODES.CONFLICT
        }));
    }
    if (CheckEmail && CheckPassword) {
        return res.status(200).json({
            message: "Login Successfull",
            data: `Welcome ${CheckEmail === null || CheckEmail === void 0 ? void 0 : CheckEmail.name}`
        });
    }
}));
// Get all agents:
exports.GetAllAgents = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const AllAgents = yield AgentModels_1.default.find();
    if (!AllAgents) {
        next(new AppError_1.AppError({
            message: "An error occured in getting all agents",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND
        }));
    }
    return res.status(200).json({
        message: "Successfully got all Agents",
        data: AllAgents
    });
}));
// Get all agents:
exports.GetOneAgent = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const OneAgent = yield AgentModels_1.default.findById(req.params.agentID);
    if (!OneAgent) {
        next(new AppError_1.AppError({
            message: "An error occured in getting this agent",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND
        }));
    }
    return res.status(200).json({
        message: "Successfully got all Agents",
        data: OneAgent
    });
}));
// Agent to see all users:
exports.SeeAllUsers = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield AgentModels_1.default.findById(req.params.agentID).populate({
        path: "Users"
    });
    if (!agent) {
        next(new AppError_1.AppError({
            message: "Can't see all users on platform",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND,
        }));
    }
    return res.status(AppError_1.HTTPCODES.OK).json({
        message: `Successfully seen all users`,
        data: agent
    });
}));
// Get one house posted by an agent:
exports.SingleAgentHouse = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield AgentModels_1.default.findById(req.params.agentID).populate({
        path: "Houses"
    });
    if (!agent) {
        next(new AppError_1.AppError({
            message: "No house found by this agent",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND,
        }));
    }
    return res.status(AppError_1.HTTPCODES.OK).json({
        message: `Successfully got all houses posted by ${agent === null || agent === void 0 ? void 0 : agent.name}`,
        data: agent
    });
}));
