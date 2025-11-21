import React, { useState } from 'react'
import Input from '../component/FormInput'
import toast from 'react-hot-toast';
import api from '../utils/urlApi';
function ForgatePage() {

    const [email, setEmail] = useState("")

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Sending reset link...");

    try {
      const res = await api.post("/auth/forgot-password", { email }); // ✅ send as object
      const data = res.data;

      toast.dismiss(); // remove loading toast
      toast.success(data.msg || "Reset link sent successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.msg || "Server error. Try again."
      );
    }
  };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        className="w-full border p-2 rounded"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                    >
                        Send Reset Link
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ForgatePage