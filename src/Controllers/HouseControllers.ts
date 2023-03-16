import { NextFunction, Request, Response } from "express";

import {AsyncHandler} from "../Utils/AsyncHandler";

import {AppError, HTTPCODES} from "../Utils/AppError"

import HouseModels from "../Models/HouseModels";

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

// Get all houses:
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
   
}
)