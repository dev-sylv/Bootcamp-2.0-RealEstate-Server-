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
exports.UsersToSeeAllHouse = exports.UsersLogin = exports.UsersRegistration = void 0;
const UserModels_1 = __importDefault(require("../Models/UserModels"));
const AsyncHandler_1 = require("../Utils/AsyncHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../Utils/AppError");
// Users Registration:
exports.UsersRegistration = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, Bio, phoneno, password, confirmPassword, role, houses } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const Users = yield UserModels_1.default.create({
        name,
        email,
        Bio,
        phoneno: 234 + phoneno,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role,
    });
    if (Users) {
        next(new AppError_1.AppError({
            message: "User with this account already exists",
            httpcode: AppError_1.HTTPCODES.FORBIDDEN
        }));
    }
    return res.status(201).json({
        message: "Successfully created User",
        data: Users
    });
}));
// Users Login:
exports.UsersLogin = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const CheckEmail = yield UserModels_1.default.findOne({ email });
    if (!CheckEmail) {
        next(new AppError_1.AppError({
            message: "User not Found",
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
// Users to see all house:
exports.UsersToSeeAllHouse = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const AllHouse = yield UserModels_1.default.findById(req.params.userID).populate({
        path: "Houses"
    });
    if (!AllHouse) {
        next(new AppError_1.AppError({
            message: "Couldn't see all houses",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND
        }));
    }
    return res.status(200).json({
        message: "Users successfully saw all the houses",
        data: AllHouse
    });
}));
