"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("./app");
const DB_1 = require("./Config/DB");
const environmentVariables_1 = require("./Config/environmentVariables");
const port = environmentVariables_1.EnvironmentVariables.PORT;
const app = (0, express_1.default)();
(0, app_1.AppConfig)(app);
(0, DB_1.DBCONNECTION)();
app.listen(port, () => {
    console.log("");
    console.log("Server is up and running on port", port);
});
