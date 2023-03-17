"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.EnvironmentVariables = {
    PORT: process.env.port,
    ADMINEMAIL: process.env.ADMINEMAIL,
    ADMINPASSWORD: process.env.ADMINPASSWORD,
    ADMINNAME: process.env.ADMINNAME
};
