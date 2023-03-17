"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const HouseRoutes_1 = __importDefault(require("./Routes/HouseRoutes"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const AgentRoutes_1 = __importDefault(require("./Routes/AgentRoutes"));
const AdminRoutes_1 = __importDefault(require("./Routes/AdminRoutes"));
const AppConfig = (app) => {
    // Configuring middlewares needed for express server 
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    // Configuring Routes for application
    // House Routes:
    app.use("/api", HouseRoutes_1.default);
    // Users Routes:
    app.use("/api", UserRoutes_1.default);
    // Agents Routes:
    app.use("/api", AgentRoutes_1.default);
    // Admin Routes:
    app.use("/api", AdminRoutes_1.default);
};
exports.AppConfig = AppConfig;
