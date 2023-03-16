import dotenv from "dotenv";

dotenv.config()

export const EnvironmentVariables = {
    PORT: process.env.port as string
}