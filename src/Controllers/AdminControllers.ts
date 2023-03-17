import { AsyncHandler } from "../Utils/AsyncHandler";

import { Request, Response, NextFunction } from "express";

import AdminModels from "../Models/AdminModels"
import { AppError, HTTPCODES } from "../Utils/AppError";

import bcrypt from "bcrypt";


// Admin Login:
export const AdminLogin = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const { email, password} = req.body;

    const CheckEmail = await AdminModels.findOne({email})

    if (!CheckEmail) {
        next(new AppError({
            message: "Admin not Found",
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
            data: `Welcome Admin ${CheckEmail?.name}`
        })
    }

})