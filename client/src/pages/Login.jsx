import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/urlApi";
import toast from "react-hot-toast";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "", role: "user" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const resp = await api.post("/auth/login", form)
            if (resp.status === 200 && resp.data.token) {

                login(resp.data.token,resp.data.user);

                if (resp.data.user.role === "admin") {
                    navigate("/admin");
                    toast.success("Admin Login successfully!");
                } else {
                    navigate("/");
                    toast.success("User Login successfully!");
                } 

            }
        } catch (err) {

           toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
                <h2 className="text-xl font-bold text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    required
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    required
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

               

                <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>

                <p className="text-center text-sm">
                    Need an account? <a href="/register" className="text-blue-600">Register</a>
                </p>
                <p className="text-center text-sm ">
                    <Link to="/forgot-password" className="text-red-600">Forgate Password</Link>
                </p>
            </form>
        </div>
    );
}
