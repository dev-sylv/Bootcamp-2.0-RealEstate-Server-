import { AsyncHandler } from "../Utils/AsyncHandler";

import { Request, Response, NextFunction } from "express";

import AdminModels from "../Models/AdminModels"
import { AppError, HTTPCODES } from "../Utils/AppError";

import bcrypt from "bcrypt";

import { EnvironmentVariables } from "../Config/environmentVariables";

// Admin Sign up:
export const AdminRegistration = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
   const {name, email, Bio, phoneno, password, role} = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(EnvironmentVariables.ADMINPASSWORD, salt)

    const Admin = await AdminModels.create({
        name: EnvironmentVariables.ADMINNAME,
        email: EnvironmentVariables.ADMINEMAIL,
        Bio,
        phoneno: 234 + phoneno,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role,
    })

    if (Admin) {
        next(new AppError({
            message: "Admin with this account already exists",
            httpcode: HTTPCODES.FORBIDDEN
        }))
    }
    return res.status(201).json({
        message: "Successfully created Admin",
        data: Admin
    })
})


// Admin Login:
export const AdminLogin = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const { email, password} = req.body;

    const adminemail = EnvironmentVariables.ADMINEMAIL;
    const adminpassword = EnvironmentVariables.ADMINPASSWORD
    const adminname =EnvironmentVariables.ADMINNAME

    if (adminemail !== email || adminpassword !== password) {
        next(new AppError({
            message: "You are not an admin",
            httpcode: HTTPCODES.NOT_FOUND
        }))
    }

    if (email === adminemail && password === adminpassword) {
        return res.status(200).json({
            message: "Admin login successfull",
            data: `Welcome Admin ${adminname}`
        })
    }

})