import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=> {
    try {
       const connectionInstance = await mongoose.connect( `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`)
       console.log("mongoDB connected !!", `|n HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDb connection Error", error)
        // you can throw error or exit process
        // throw error
        process.exit(1)
    }
}

export default connectDB;
