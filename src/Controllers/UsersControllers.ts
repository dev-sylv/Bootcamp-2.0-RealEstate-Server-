import { NextFunction, Request, Response } from "express";
import { IUSER } from "../AllInterfaces/UserInterfaces";
import UserModels from "../Models/UserModels";
import { AsyncHandler } from "../Utils/AsyncHandler";
import Cloud from "../Config/cloudinary";
import bcrypt from "bcrypt"
import { AppError, HTTPCODES } from "../Utils/AppError";
import HouseModels from "../Models/HouseModels";
import AgentModels from "../Models/AgentModels";
import mongoose from "mongoose";

// Users Registration:
export const UsersRegistration = AsyncHandler(async(
    req: any,
    res: Response,
    next: NextFunction
) =>{
    const {name, email, Bio, phoneno, password, confirmPassword, role, houses } = req.body;

    const agent = await AgentModels.findById(req.params.agentID)
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const Users = await UserModels.create({
        name,
        email,
        Bio,
        phoneno: 234 + phoneno,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role,
    })

    agent?.users.push(mongoose.Types.ObjectId)
    agent?.save()
    
    if (Users) {
        next(new AppError({
            message: "User with this account already exists",
            httpcode: HTTPCODES.FORBIDDEN
        }))
    }
    return res.status(201).json({
        message: "Successfully created User",
        data: Users
    })
})

// Users Login:
export const UsersLogin = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const { email, password} = req.body;

    const CheckEmail = await UserModels.findOne({email})

    if (!CheckEmail) {
        next(new AppError({
            message: "User not Found",
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

// Users to see all house:
export const UsersToSeeAllHouse = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const AllHouse = await UserModels.findById(req.params.userID).populate({
        path: "Houses"
    })
    if (!AllHouse) {
        next(new AppError({
            message: "Couldn't see all houses",
            httpcode: HTTPCODES.NOT_FOUND
        }))
    }

    return res.status(200).json({
        message: "Users successfully saw all the houses",
        data: AllHouse
    })
})