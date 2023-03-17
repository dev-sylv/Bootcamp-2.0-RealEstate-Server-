import mongoose, { Schema, model } from "mongoose";

import { IADMIN } from "../AllInterfaces/UserInterfaces";

import isEmail from "validator/lib/isEmail";

const AdminSchema: Schema<IADMIN> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    Image:{
        type: String,
    },
    Bio:{
        type: String,
        required: [true, "Please enter a brief bio"]
    },
    phoneno:{
        type: Number,
        required: [true, "Please enter your Phone number"]
    },
    password: {
        type: String,
        required: [true, "Please enter your Password"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"]
    },
    role: {
        type: String,
        required: [true, "Please enter your role"],
        message: "You must either be a User, Agent or Admin",
        enum: ["User", "Admin", "Agent"],
        default: "Admin"
    },
    houses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Houses"
        }
    ],
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ],
    agents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agents"
        }
    ],
},
{
    timestamps: true
});



const AgentModels = model<IADMIN>("Admins", AdminSchema);

export default AgentModels;