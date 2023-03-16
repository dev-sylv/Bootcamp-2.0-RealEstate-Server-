import { NextFunction, Request, Response } from "express";
import { IUSER } from "../AllInterfaces/UserInterfaces";
import UserModels from "../Models/UserModels";
import { AsyncHandler } from "../Utils/AsyncHandler";
import Cloud from "../Config/cloudinary";
import bcrypt from "bcrypt"

// Users Registration:
export const UsersRegistration = AsyncHandler(async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const {name, email, Image, Bio, phoneno, password, confirmPassword, role, houses } = req.body;

    const CloudImg = await Cloud.uploader?.upload(req?.file!.path);

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(salt, password)

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
})

// Users Login: