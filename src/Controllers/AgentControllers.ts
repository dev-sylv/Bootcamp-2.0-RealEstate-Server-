import { NextFunction } from "express";
import { AsyncHandler } from "../Utils/AsyncHandler";
import bcrypt from "bcrypt";
import AgentModels from "../Models/AgentModels"
import { AppError, HTTPCODES } from "../Utils/AppError";
import {Request, Response} from 'express'


// Agent Sign up:
export const AgentRegistration = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
   const {name, email, Bio, phoneno, password, role} = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const Agent = await AgentModels.create({
        name,
        email,
        Bio,
        phoneno: 234 + phoneno,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role,
    })

    if (Agent) {
        next(new AppError({
            message: "Agent with this account already exists",
            httpcode: HTTPCODES.FORBIDDEN
        }))
    }
    return res.status(201).json({
        message: "Successfully created Agent",
        data: Agent
    })
})

// Agent Login:
export const AgentLogin = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const { email, password} = req.body;

    const CheckEmail = await AgentModels.findOne({email})

    if (!CheckEmail) {
        next(new AppError({
            message: "Agent not Found",
            httpcode: HTTPCODES.NOT_FOUND
        }))
    }

    const CheckPassword = await bcrypt.compare(password, CheckEmail!.password)

    if (!CheckPassword) {
        next(new AppError({
            message: "Email or password not correct",
            httpcode: HTTPCODES.CONFLICT
        }))
    }

    if (CheckEmail && CheckPassword) {
        return res.status(200).json({
            message: "Login Successfull",
            data: `Welcome ${CheckEmail?.name}`
        })
    }

})

// Get all agents:
export const GetAllAgents = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const AllAgents = await AgentModels.find();
    if (!AllAgents) {
        next(new AppError({
            message: "An error occured in getting all agents",
            httpcode: HTTPCODES.NOT_FOUND
        }))
    }

    return res.status(200).json({
        message: "Successfully got all Agents",
        data: AllAgents
    })
})

// Get all agents:
export const GetOneAgent = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const OneAgent = await AgentModels.findById(req.params.agentID);
    if (!OneAgent) {
        next(new AppError({
            message: "An error occured in getting this agent",
            httpcode: HTTPCODES.NOT_FOUND
        }))
    }

    return res.status(200).json({
        message: "Successfully got all Agents",
        data: OneAgent
    })
})