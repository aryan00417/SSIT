import multer from "multer"

//When a user uploads a file, Multer helps your backend receive and store it.
//config storage 

const storage = multer.diskStorage({ //Files will be stored on your server’s disk
  destination : (req,file,cb)=>{
      cb(null,"uploads/") //cb is callback //Tells Multer which folder to save the file in.
  },
  filename: (req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`)
  }
})

//file filter
//This function decides: "Should I accept this file or reject it?”
const fileFilter = (req,file,cb)=>{
  const allowedTypes = ["image/jpeg","image/png","image/jpg"]

  if(allowedTypes.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(new Error("only .jpeg, .png and .jpg formats are allowed"),false)
  }
}

const upload = multer({storage,fileFilter})

export default upload