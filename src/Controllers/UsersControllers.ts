import { NextFunction, Request, Response } from "express";
import { IUSER } from "../AllInterfaces/UserInterfaces";
import UserModels from "../Models/UserModels";
import { AsyncHandler } from "../Utils/AsyncHandler";
import Cloud from "../Config/cloudinary";
import bcrypt from "bcrypt"
import { AppError, HTTPCODES } from "../Utils/AppError";

// Users Registration:
export const UsersRegistration = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const {name, email, Image, Bio, phoneno, password, confirmPassword, role, houses } = req.body;

    const CloudImg = await Cloud.uploader.upload(req!.file?.path);
    console.log(CloudImg)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const Users = await UserModels.create({
        name,
        email,
        Image: CloudImg.secure_url,
        Bio,
        phoneno,
        password: hashedPassword,
        confirmPassword,
        role,
    })

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