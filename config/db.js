import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://devShad:%231iitKGPop@cluster0.oyi0mq8.mongodb.net/?retryWrites=true&w=majority");
    }catch(err){
        console.error("connection failed" + err.message);
    }
}