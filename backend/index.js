import express from 'express'
import cors from 'cors'
import dotenv, { config } from 'dotenv'

dotenv.config()
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