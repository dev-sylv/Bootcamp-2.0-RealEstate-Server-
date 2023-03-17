import { NextFunction, Request, Response } from "express";

import {AsyncHandler} from "../Utils/AsyncHandler";

import {AppError, HTTPCODES} from "../Utils/AppError"

import HouseModels from "../Models/HouseModels";
import AgentModels from "../Models/AgentModels";
import mongoose from "mongoose";

// Get all houses:
export const GetAllHouses = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const Houses = await HouseModels.find();

    if (!Houses) {
        next(
            new AppError({
                message: "Houses Not Found",
                httpcode: HTTPCODES.NOT_FOUND
            })
        )
    }

    return res.status(200).json({
        message: "Successfully got all houses",
        data: Houses
    })
   
})

// Get one houses:
export const GetSingleHouse = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const House = await HouseModels.findById(req.params.houseID);

    if (!House) {
        next(
            new AppError({
                message: "This house hasn't been posted, \n House Not Found",
                httpcode: HTTPCODES.NOT_FOUND
            })
        )
    }

    return res.status(200).json({
        message: "Successfully got all houses",
        data: House
    })
   
})

// Upload New House:
export const UploadHouses = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const Agent = await AgentModels.findById(req.params.agentID);

    if (!Agent) {
        next(new AppError({
            message: "Couldn't get Agent",
            httpcode: HTTPCODES.NOT_FOUND
        }))
    }
    
    if (Agent?.role === "Agent") {
        const {houseName, houseDescription,bedrooms, bathrooms, housePrice, HouseImage, houseRentage, houseLocation} = req.body;


    const house = await HouseModels.create({
        houseName,
        houseDescription,
        housePrice,
        HouseImage,
        houseRentage,
        houseLocation,
        bathrooms,
        bedrooms,
        agentname: Agent?.name,
    })

    Agent?.houses.push(new mongoose.Types.ObjectId(house._id))
    Agent?.save();

    return res.status(201).json({
        message: "Successfully posted new houses",
        data: house
    })

    } else {
        return res.status(400).json({
            message: "You're not authorized to upload houses"
        })
    }

       
})

// View all houses:


// Search for houses