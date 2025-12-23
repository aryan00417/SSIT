import express from 'express'
import cors from 'cors'
import dotenv, { config } from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import taskRoutes from "./routes/task.route.js"
import reportRoutes from "./routes/report.route.js"
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
app.use(cookieParser())




app.listen(3000,()=>{
  console.log("the server is running at port 3000!")
})

//Whenever a request starts with /api/auth, send it to authRoutes
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/task",taskRoutes)
app.use("/api/report",reportRoutes)


//middleware for error handling
app.use((err,req,res,next) =>{
  const statusCode = err.statusCode || 500
  const message = err.message || "internal server error"

 res.status(statusCode).json(
  {
    succes: false,
    statusCode,
    message,
  }
 )
}
)