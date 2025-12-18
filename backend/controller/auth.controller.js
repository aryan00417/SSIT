import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"


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

export const signIn = async(req,res,next)=>{
  try {
    const {email,password} = req.body
    if(!email || !password || email==="" || password===""){
      return next(errorHandler(400,"all fields are required"))
    }

    const validUser = await User.findOne({email})
    if(!validUser){
      return next(errorHandler(404,"User not found"))
    }

    const validPassword = bcryptjs.compareSync(password,validUser.password)
    if(!validPassword){
      return next(errorHandler(400,"enter valid credentials"))
    }

    const token  = jwt.sign({id: validUser._id,role: validUser.role}, process.env.JWT_SECRET) //creating a token

    const {password:pass,...rest } = validUser._doc //storing user values in rest , except passworrd
    

    res.status(200).cookie("access_token",token,{httpOnly: true}).json(rest) //storing the token in cokkie and returning rest the user values
    
  } catch (error) {
    next(error)
  }
}

export const userProfile = async(req,res,next) =>{
  try {
    const user = await User.findById(req.user.id)

    if(!user){
      return next(errorHandler(404,"user not found"))
    }
    const {password:pass,...rest} = user._doc
    res.status(200).json(rest)
  } catch (error) {
    return next(error)  
  }
}

export const updateProfile = async(req,res,next) =>{
  try {
    const user =  await User.findById(req.user.id)

    if(!user){
      return next(errorHandler(404,"user not found"))
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if(req.body.password){
      user.password = bcryptjs.hashSync(req.body.password,10)
    }

    const updatedUser = await user.save()

    const {password: pass,...rest} = updatedUser._doc
    res.status(200).json(rest)
  } catch (error) {
    return next(errorHandler(400,"user not found"))
  }
}

export const uploadImage = async(req,res,next) =>{
  try {
    if(!req.file){
      return next(errorHandler(400,"no file has been uploaded"))
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

    res.status(200).json({ imageUrl })
  } catch (error) {
    next(error)
  }
}



//A file that contains the logic of what should happen when a user signs up, logs in, logs out, etc.