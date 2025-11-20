import express from "express";

import { adminMiddleware } from "../middleware/adminMiddler.js";
import authMiddleware from "../middleware/authMiddler.js";
import { getAllUsers,updateUserRole,getAllTodos } from "../controllers/adminController.js";
const router = express.Router();


router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Update user role (admin only)
router.patch("/users/:id/role", authMiddleware, adminMiddleware, updateUserRole);

// View all todos (admin only)
router.get("/todos", authMiddleware, adminMiddleware, getAllTodos);

export default router;
