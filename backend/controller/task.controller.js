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
      attachemnts,
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
      attachemnts,
      todoCheckList,
      createdBy: req.user.id,
    })
    res.status(201).json({message: "Task created succesfully",task})
  } catch (error) {
    next(error);
  }
};
