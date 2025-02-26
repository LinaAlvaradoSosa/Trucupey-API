import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()

export async function conectDB() {
    const link = process.env.LINK
    try {
        await mongoose.connect(link)
        console.log("connected to the datebase");
        
    } catch (error) {
        console.log(error);
        console.log("Cound not conneted to the datebase");   
    }
}
