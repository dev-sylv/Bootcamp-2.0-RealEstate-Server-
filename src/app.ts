import express, { Application, Request, Response } from "express";

import cors from "cors";

import morgan from "morgan"

export const AppConfig = (app: Application) =>{
    // Configuring middlewares needed for express server 
    app.use(express.json())
    app.use(cors())
    app.use(morgan("dev"))

    // Configuring Routes for application
}