import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/urlApi";
function ResetPasswordPage() {
    const { token } = useParams();
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        toast.loading("Updating password...");

        try {
            const res = await api.post(`/auth/reset-password/${token}`, { password });

            if (res.status === 200) {
                toast.dismiss();
                toast.success(res.data.msg || "Password updated successfully!");
                setPassword("");
                navigate("/login");

            }
        } catch (err) {
            console.error(err);
            toast.dismiss();
            toast.error(err.response?.data?.msg || "Invalid or expired token.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded transition" >
                        Reset Password
                    </button>
                </form>



            </div>
        </div>
    );
}

export default ResetPasswordPage;
