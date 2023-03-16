import express, { Application } from "express";
import { EnvironmentVariables } from "./Config/environmentVariables";

const port = EnvironmentVariables.PORT;

const app: Application = express();

app.listen(port, () =>{
    console.log("Server is up and running on port", port)
})
