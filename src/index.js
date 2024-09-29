import connectDB from "./db/index.js";
import express from  "express";
import dotenv from "dotenv"

const app = express();

dotenv.config({path: '/env'})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=> console.log("server stated listenig on ",process.env.PORT))
})
.catch((err) => console.log("MongoDB connection falied...")
)




/*
( async()=>{
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      // Listener
      app.on("error", (error) =>{
        console.log("Error", error)
        throw error;
      })
      // Listen on server

      app.listen(process.env.PORT, () => {
        console.log(`app is listenig port ${process.env.PORT}`)
      })
    } catch (error) {
        console.error("ERROR", error)
        throw error
    }
})()
*/