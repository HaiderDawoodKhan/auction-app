import mongoose from 'mongoose';

export const connect = async () => {
    try{
        console.log("Connecting to database...");
        const data = await mongoose.connect(process.env.MONGO_URI)
        console.log("connected")
    }
    catch (error){
        console.log("Error connecting to database")
    }
};