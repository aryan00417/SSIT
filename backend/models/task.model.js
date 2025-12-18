import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text:{
      type: String,
      required: true
    },

    completed: {
      type: Boolean,
      default: false,
    }
  }
)
const taskSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true
    },

    description:{
      typr: String,
    },

    priority:{
      type: String,
      enum: ["Low","Medium","High"],
      default: "Low",
    },

    status:{
      type: String,
      enum : ["Pending","In Progress","Completed"],
      default: "Pending",
    },

    dueDate:{
      type: Date,
      required: true,
    },

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId, //BEACUSE joh logo ko apn assign karenge woh moongose ke objects hai, like sab ko ek unique id milta hai
        ref: "User" // tells mongoose this ID belongs to User model
      },
    ],

    createdBy: [
      {
        type: mongoose.Schema.Types.ObjectId, //ki bhot sare admin ho sakte hai
        ref: "User"
      },
    ],

    attachments:[
      {
        type: String,
      },
    ],

    todoCheckList: [todoSchema],

    progress: {type:Number, default:0},

  },
  {timestamps:true}
)

const Task =mongoose.model("Task",taskSchema)
export default Task