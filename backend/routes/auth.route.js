import express from 'express'
import { signIn, signUp } from '../controller/auth.controller.js'
 const router = express.Router()

 router.post("/sign-up",signUp) //Use POST when you want to create or send data to the server.
 router.post("/sign-in",signIn)

 export default router