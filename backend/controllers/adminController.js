import { UserModel } from "../model/userModel.js";

import { TodoModel } from "../model/TodoModel.js";

// ----------------- View all users -----------------
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");

        res.json({
            status: true,
            users
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ----------------- Update User Role -----------------
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({
            status: true,
            message: "Role updated successfully",
            user: updatedUser
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ----------------- Get All Todos (Admin Only) -----------------
export const getAllTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find().populate("userId", "username email");

        res.json({
            status: true,
            todos
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
