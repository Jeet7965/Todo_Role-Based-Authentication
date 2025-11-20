import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 100,
            trim: true,
        },

        description: {
            type: String,
            maxlength: 500,
            default: "",
            trim: true,
        },

        dueDate: {
            type: Date,
            default: null,
        },

        category: {
            type: String,
            enum: ["Urgent", "Non-Urgent"],
            default: "Non-Urgent",
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const TodoModel = mongoose.model("Todo", todoSchema);
