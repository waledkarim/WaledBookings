import mongoose from "mongoose";

export default async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
        console.log("[db] Connected to DB");
    } catch (error) {
        console.log("An error occured: " +error);
    }   
}