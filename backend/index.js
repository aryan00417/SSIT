import express from 'express'
import cors from 'cors'
import dotenv, { config } from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from "./routes/auth.route.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Database connected succesfully");
})
.catch((err)=>{
  console.log(err)
})

const app = express()

//middleware to handle cors
app.use(
  cors({
    origin: process.env.FRONT_END_URL || "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type","Authorization"],
  })
)

//Middle wear to handle JSON obj in req body

app.use(express.json())




app.listen(3000,()=>{
  console.log("the server is running at port 3000!")
})

app.use("/api/auth",authRoutes)