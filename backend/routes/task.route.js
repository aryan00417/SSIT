import express from "express"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"
import { createTask, delteTask, getTask, getTaskById, updateTask } from "../controller/task.controller.js"

const router = express.Router()

router.post("/create",verifyToken,adminOnly,createTask)
router.get("/",verifyToken,getTask)
router.get("/:id",verifyToken,getTaskById  )
router.put("/:id",verifyToken,updateTask)
router.delete("/:id",verifyToken,adminOnly,delteTask)

export default router