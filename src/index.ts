import express, { Application, Request, Response } from "express";
import { AppConfig } from "./app";
import { DBCONNECTION } from "./Config/DB";
import { EnvironmentVariables } from "./Config/environmentVariables";

const port = EnvironmentVariables.PORT;

const app: Application = express();
AppConfig(app)
DBCONNECTION()

app.get("/", (req: Request, res: Response) =>{
    return res.status(200).json({
        message: "API READY FOR CONSUMPTION"
    })
})

app.listen(port, () =>{
    console.log("")
    console.log("Server is up and running on port", port)
})
