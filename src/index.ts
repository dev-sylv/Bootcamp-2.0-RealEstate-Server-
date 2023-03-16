import express, { Application } from "express";
import { AppConfig } from "./app";
import { DBCONNECTION } from "./Config/DB";
import { EnvironmentVariables } from "./Config/environmentVariables";

const port = EnvironmentVariables.PORT;

const app: Application = express();
AppConfig(app)
DBCONNECTION()

app.listen(port, () =>{
    console.log("")
    console.log("Server is up and running on port", port)
})
