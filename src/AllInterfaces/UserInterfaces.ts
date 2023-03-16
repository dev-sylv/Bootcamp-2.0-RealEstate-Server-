import { Document } from "mongoose";

// Users Interfaces
export interface IUSER extends Document{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

// Agent Interfaces
export interface IAGENT extends Document{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

// Admin Interfaces
export interface IADMIN extends Document{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}
