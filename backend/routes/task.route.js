import express from "express"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"
import { createTask, delteTask, getDashboardData, getTask, getTaskById, updateTask, updateTaskChecklist, updateTaskStatus } from "../controller/task.controller.js"


const router = express.Router()

router.post("/create",verifyToken,adminOnly,createTask)

router.get("/",verifyToken,getTask)

router.get("/dashboard-data",verifyToken,adminOnly,getDashboardData)

//always declare static route before dynamic route

router.get("/:id",verifyToken,getTaskById)

router.put("/:id",verifyToken,updateTask)

router.delete("/:id",verifyToken,adminOnly,delteTask)

router.put("/:id/status",verifyToken,updateTaskStatus)

router.put("/:id/todo",verifyToken,updateTaskChecklist)

export default router