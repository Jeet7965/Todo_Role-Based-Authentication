import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import authRoutes from "./router/authRoutes.js"
import  todoRoutes from "./router/todoRoutes.js"
import adminRoutes from "./router/adminRoutes.js"
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app .use(cors({
     origin: [
       "http://localhost:5173"
    ],
    credentials:true,
}))
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
