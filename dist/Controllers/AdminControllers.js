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
exports.AdminSeeAllAgents = exports.AdminSeeAllUsers = exports.AdminLogin = exports.AdminRegistration = void 0;
const AsyncHandler_1 = require("../Utils/AsyncHandler");
const AdminModels_1 = __importDefault(require("../Models/AdminModels"));
const AppError_1 = require("../Utils/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const environmentVariables_1 = require("../Config/environmentVariables");
// Admin Sign up:
exports.AdminRegistration = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, Bio, phoneno, password, role } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(environmentVariables_1.EnvironmentVariables.ADMINPASSWORD, salt);
    const Admin = yield AdminModels_1.default.create({
        name: environmentVariables_1.EnvironmentVariables.ADMINNAME,
        email: environmentVariables_1.EnvironmentVariables.ADMINEMAIL,
        Bio,
        phoneno: 234 + phoneno,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role,
    });
    if (Admin) {
        next(new AppError_1.AppError({
            message: "Admin with this account already exists",
            httpcode: AppError_1.HTTPCODES.FORBIDDEN
        }));
    }
    return res.status(201).json({
        message: "Successfully created Admin",
        data: Admin
    });
}));
// Admin Login:
exports.AdminLogin = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const adminemail = environmentVariables_1.EnvironmentVariables.ADMINEMAIL;
    const adminpassword = environmentVariables_1.EnvironmentVariables.ADMINPASSWORD;
    const adminname = environmentVariables_1.EnvironmentVariables.ADMINNAME;
    if (adminemail !== email || adminpassword !== password) {
        next(new AppError_1.AppError({
            message: "You are not an admin",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND
        }));
    }
    if (email === adminemail && password === adminpassword) {
        return res.status(200).json({
            message: "Admin login successfull",
            data: `Welcome Admin ${adminname}`
        });
    }
}));
// Admin to see all users:
exports.AdminSeeAllUsers = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield AdminModels_1.default.findById(req.params.adminID).populate({
        path: "Users"
    });
    if (!admin) {
        next(new AppError_1.AppError({
            message: "Can't see all users on platform",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND,
        }));
    }
    return res.status(AppError_1.HTTPCODES.OK).json({
        message: `Successfully seen all users`,
        data: admin
    });
}));
// Admin to see all agents:
exports.AdminSeeAllAgents = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield AdminModels_1.default.findById(req.params.adminID).populate({
        path: "Agents"
    });
    if (!admin) {
        next(new AppError_1.AppError({
            message: "Can't see all agents on platform",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND,
        }));
    }
    return res.status(AppError_1.HTTPCODES.OK).json({
        message: `Successfully seen all Agents`,
        data: admin
    });
}));
