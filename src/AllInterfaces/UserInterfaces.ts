import { Document } from "mongoose";

// Users Interfaces
export interface IUSER extends Document{
    name: string;
    email: string;
    Image: string;
    Bio: string;
    phoneno: number;
    password: string;
    confirmPassword: string;
    role: string;
    houses: {}[];
}

// Agent Interfaces
export interface IAGENT extends Document{
    name: string;
    email: string;
    Image: string;
    Bio: string;
    phoneno: number;
    password: string;
    confirmPassword: string;
    role: string;
    houses: {}[];
    users: {}[];
}

// Admin Interfaces
export interface IADMIN extends Document{
    name: string;
    email: string;
    Image: string;
    Bio: string;
    phoneno: number;
    password: string;
    confirmPassword: string;
    role: string;
    houses: {}[];
    users: {}[];
    agents: {}[];
}


// House Interfaces
export interface IHOUSE extends Document{
    houseName: string;
    houseDescription: string;
    housePrice: string;
    bedrooms: string;
    bathrooms: string;
    HouseImage: string;
    houseRentage: string;
    houseLocation: string;
    agentname: string;
    views: []
}


