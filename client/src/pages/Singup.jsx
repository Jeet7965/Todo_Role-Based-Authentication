import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../component/FormInput"; // Custom Input component
import api from "../utils/urlApi";
import toast from "react-hot-toast";
export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
      const resp = await api.post("/auth/register", form);

      if (resp.status === 201 || resp.status === 200) {
         toast.success("User registered successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
       toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
   toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        {/* Name input */}
        <Input
          type="text"
          label="Name"
          placeholder="Enter your name"
          className="w-full border p-2 rounded"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {/* Email input */}
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password input */}
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          className="w-full border p-2 rounded"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-600 text-white w-full py-2 rounded">Register</button>

        <p className="text-center text-sm">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </form>
    </div>
  );
}
