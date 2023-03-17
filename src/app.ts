import express, { Application, Request, Response } from "express";

import cors from "cors";

import morgan from "morgan"
import HouseRouter from "./Routes/HouseRoutes";
import UserRouter from "./Routes/UserRoutes";
import AgentRouter from "./Routes/AgentRoutes";
import AdminRouter from "./Routes/AdminRoutes";

export const AppConfig = (app: Application) =>{
    // Configuring middlewares needed for express server 
    app.use(express.json())
    app.use(cors())
    app.use(morgan("dev"))

    // Configuring Routes for application
    // House Routes:
    app.use("/api", HouseRouter)
    // Users Routes:
    app.use("/api", UserRouter)

    // Agents Routes:
    app.use("/api", AgentRouter)

    // Admin Routes:
    app.use("/api", AdminRouter)
    
}