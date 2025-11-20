import express from "express";
import { createTodo,getTodos,deleteTodo,updateTodo,getByIdTodos} from "../controllers/todocontroller.js";
import authMiddleware from "../middleware/authMiddler.js";
import { adminMiddleware } from "../middleware/adminMiddler.js";
const router = express.Router();

// Protected route
router.get("/", authMiddleware,  getTodos);
router.get("/:id", authMiddleware, getByIdTodos);
router.post("/", authMiddleware, createTodo);
router.put("/:id",authMiddleware,updateTodo)
router.delete("/:id", authMiddleware, deleteTodo);
export default router;
