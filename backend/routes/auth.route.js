import express from 'express'
import { signIn, signUp,  updateProfile,  uploadImage,  userProfile } from '../controller/auth.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
import upload from '../utils/multer.js'
 const router = express.Router()

 router.post("/sign-up",signUp) //Use POST when you want to create or send data to the server.
 router.post("/sign-in",signIn)

 router.get("/user-profile",verifyToken,userProfile)
 router.put("/update-profile",verifyToken,updateProfile)
 router.post("/upload-image",upload.single("image"),uploadImage)

 export default router