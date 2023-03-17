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
exports.QuerySearchforHouse = exports.UsersViewOfHouses = exports.UploadHouses = exports.GetSingleHouse = exports.GetAllHouses = void 0;
const AsyncHandler_1 = require("../Utils/AsyncHandler");
const AppError_1 = require("../Utils/AppError");
const HouseModels_1 = __importDefault(require("../Models/HouseModels"));
const AgentModels_1 = __importDefault(require("../Models/AgentModels"));
const mongoose_1 = __importDefault(require("mongoose"));
// Get all houses:
exports.GetAllHouses = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Houses = yield HouseModels_1.default.find();
    if (!Houses) {
        next(new AppError_1.AppError({
            message: "Houses Not Found",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND
        }));
    }
    return res.status(200).json({
        message: "Successfully got all houses",
        data: Houses
    });
}));
// Get one houses:
exports.GetSingleHouse = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const House = yield HouseModels_1.default.findById(req.params.houseID);
    if (!House) {
        next(new AppError_1.AppError({
            message: "This house hasn't been posted, \n House Not Found",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND
        }));
    }
    return res.status(200).json({
        message: "Successfully got all houses",
        data: House
    });
}));
// Upload New House:
exports.UploadHouses = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Agent = yield AgentModels_1.default.findById(req.params.agentID);
    if (!Agent) {
        next(new AppError_1.AppError({
            message: "Couldn't get Agent",
            httpcode: AppError_1.HTTPCODES.NOT_FOUND
        }));
    }
    if ((Agent === null || Agent === void 0 ? void 0 : Agent.role) === "Agent") {
        const { houseName, houseDescription, bedrooms, bathrooms, housePrice, HouseImage, houseRentage, houseLocation } = req.body;
        const house = yield HouseModels_1.default.create({
            houseName,
            houseDescription,
            housePrice,
            HouseImage,
            houseRentage,
            houseLocation,
            bathrooms,
            bedrooms,
            agentname: Agent === null || Agent === void 0 ? void 0 : Agent.name,
        });
        Agent === null || Agent === void 0 ? void 0 : Agent.houses.push(new mongoose_1.default.Types.ObjectId(house._id));
        Agent === null || Agent === void 0 ? void 0 : Agent.save();
        return res.status(201).json({
            message: "Successfully posted new houses",
            data: house
        });
    }
    else {
        return res.status(400).json({
            message: "You're not authorized to upload houses"
        });
    }
}));
// View all houses:
exports.UsersViewOfHouses = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const views = yield HouseModels_1.default.findByIdAndUpdate(req.params.id, {
            $push: { views: req.body.ip }
        }, { new: true });
        return res.status(200).json({
            message: "Successfully got user views on the houses",
            data: views
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An error occured in getting user views",
            data: error
        });
    }
}));
// Search for houses
exports.QuerySearchforHouse = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query;
        const searchQuery = yield HouseModels_1.default.find(search);
        return res.status(200).json({
            message: "Successfully got the searched house",
            data: searchQuery
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An error occured in getting searched house",
            data: error
        });
    }
}));
