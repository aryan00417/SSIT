import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

export const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoCheckList,
    } = req.body;

    if(!Array.isArray(assignedTo)){
      return next(errorHandler(400,"assigned to must be an Array of user ids"))
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoCheckList,
      createdBy: req.user.id,
    })
    
    res.status(201).json({message: "Task created succesfully",task})
  } catch (error) {
    next(error);
  }
}

//this for the dashboard contaning div to indicate the progress of tasks
export const getTask = async(req,res,next)=>{
  try {
    const {status} = req.query
   //filter here is an obj that is gonna store the status of task
    const filter = {}
    if(status){
      filter.status = status
    }

    let tasks

    if(req.user.role === "admin"){
      tasks = await Task.find(filter).populate("assignedTo","name email profileImageUrl")
    }else{
      tasks = await Task.find({
        ...filter,
        assignedTo: req.user.id,
      }).populate("assignedTo","name email profileImageUrl")
    }
    tasks = await Promise.all(
      tasks.map(async(task)=>{
        //filter() is used to pick only the items you want from a list.
        const completedCount = task.todoCheckList.filter((item)=>item.completed).length

        return {...task._doc,completedCount: completedCount}
      })
    )

    //status summary


    //If admin → {} → count all tasks  AND If not admin → { assignedTo: userId } → count only their tasks
    const allTask = await Task.countDocuments(
      req.user.role === "admin" ? {} : {assignedTo : req.user.id}
    )

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && {assignedTo: req.user.id}),
    })

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role !== "admin" && {assignedTo: req.user.id}),
    })

     const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && {assignedTo: req.user.id}),
    })
    res.status(200).json({
      tasks,
      statusSummary:{
        all: allTask,
        pendingTasks,
        inProgressTasks,
        completedTasks
      }
    })

  } catch (error) {
    next(error)
  }
}

export const getTaskById =async(req,res,next)=>{
  try {
    const task = await Task.findById(req.params.id).populate("assignedTo","name email profileImageUrl")

    if(!task){
      return next(errorHandler(404,"task not found!"))
    }
     res.status(200).json(task)
  } catch (error) {
   next(error) 
  }
}

export const updateTask = async(req,res,next)=>{
   try {
    const task  = await Task.findById(req.params.id)
    if(!task){
      return next(errorHandler(404,"Task not found"))
    }
    task.title = req.body.title || task.title
    task.description = req.body.description || task.description
    task.priority  = req.body.priority || task.priority
    task.dueDate  = req.body.dueDate ||task.dueDate
    task.todoCheckList  =req.body.todoCheckList || task.todoCheckList
    task.attachments = req.body.attachments || task.attachments

    if(req.body.assignedTo){
      if(!Array.isArray(req.body.assignedTo)){
        return next(errorHandler(400,"AssignedTo must be an Array"))
      }
      task.assignedTo = req.body.assignedTo 
    }

    const updatedTask = await task.save()

    return res.status(200).json({updatedTask,message:"the task has been updated succesfully"})

   } catch (error) {
    next(error)
   }
}