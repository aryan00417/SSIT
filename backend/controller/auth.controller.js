import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"


export const signUp = async(req,res,next)=>{
  
  const {name,email,password,profileImageUrl,adminJoinCode} = req.body

  if(!name || !email || !password ||name==="" || email==="" || password===""){
    return next(errorHandler(400,"all fields are required"))
  }

  //cxehack if user already exists
  
  const isAlreadyExist = await User.findOne({email})

  //We use async and await when we are doing something that takes time,

  if(isAlreadyExist){
      return next(errorHandler(400,"user already exsist"))
  }

  //check user role

  let role="user"
  if(adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE){
    role = "admin"
  }

  //hashing the password by bcryptjs

  const hashedPassword = bcryptjs.hashSync(password,10)

  const newUser = new User({
    name,
    email,
    password:hashedPassword,
    profileImageUrl,
    role,
  })

  try {
    await newUser.save()
    res.json("account created succesfully")
  } catch (error) {
    next(error)

    
  }

} 

//A file that contains the logic of what should happen when a user signs up, logs in, logs out, etc.