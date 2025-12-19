import express from "express"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"
import { createTask, getTask, getTaskById } from "../controller/task.controller.js"

const router = express.Router()

router.post("/create",verifyToken,adminOnly,createTask)
router.get("/",verifyToken,getTask)
router.get("/:id",verifyToken,getTaskById)

export default router