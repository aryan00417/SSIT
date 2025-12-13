import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },

  email:{
    type: String,
    required: true,
    unique: true,
  },

  password:{
    type: String,
    required: true,
  },

  profileImageUrl:{
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
  },

  role:{
    type:String,
    enum: ["admin","user"],
    default: "user"
  }


},
{timestamps:true}
)

const User = mongoose.model("User",userSchema) 

export default User
// three easy process: 1.index meh set moongose connection 2.Schema define karo 3.model bnao , so here User is a the name of the collection where userSchema is the schema