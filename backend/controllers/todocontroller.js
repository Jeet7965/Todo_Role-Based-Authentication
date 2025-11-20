import { TodoModel } from "../model/TodoModel.js";

export const createTodo = async (req, res) => {
    try {
        const { title, description, dueDate, category } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (title.length > 100) {
            return res.status(400).json({ message: "Title exceeds 100 characters" });
        }

        if (description && description.length > 500) {
            return res.status(400).json({ message: "Description exceeds 500 characters" });
        }

        const todo = await TodoModel.create({
            title,
            description,
            dueDate,
            category,
            userId: req.user._id,
        });

        res.json({
            message: "Todo created successfully",
            todo,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find({ userId: req.user._id }).sort({ createdAt: -1 });

        res.json({
            status: true,
            todos
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getByIdTodos = async (req, res) => {

    try {
        const {id}=req.params
        const todos = await TodoModel.findById({ _id: id, userId: req.user._id });
         if (!todos) return res.status(404).json({ status: false, message: "Todo not found" });
        res.json({
            status: true,
            todos
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await TodoModel.findByIdAndUpdate(
            { _id: id, userId: req.user._id },
            req.body,
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Todo not found" });

        res.json({
            status: true,
            message: "Todo updated successfully",
            todo: updated
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await TodoModel.findByIdAndDelete({ _id: id, userId: req.user._id })
        if (!deleted) return res.status(404).json({ message: "Todo not found" });
        res.json({
            status: true,
            message: "Todo deleted successfully"
        });
    } catch (err) {
 res.status(500).json({ message: err.message });
    }
}
