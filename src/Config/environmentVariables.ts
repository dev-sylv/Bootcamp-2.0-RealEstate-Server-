import dotenv from "dotenv";

dotenv.config()

export const EnvironmentVariables = {
    PORT: process.env.port as string,
    ADMINEMAIL: process.env.ADMINEMAIL as string,
    ADMINPASSWORD: process.env.ADMINPASSWORD as string
}