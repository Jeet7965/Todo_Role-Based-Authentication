import { useState, useEffect } from "react";
import api from "../utils/urlApi";
import toast from "react-hot-toast";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    //  Fetch all users (Admin only)
    const fetchUsers = async () => {
        try {
            const resp = await api.get("/admin/users");
            setUsers(resp.data.users);
        } catch (error) {
            toast.error("Failed to fetch users!");
            console.log("Error fetching admin users:", error);
        }
    };

    //  Update Role (Admin promote/demote)
    const updateRole = async (id, role) => {
        try {
            await api.patch(`/admin/users/${id}/role`, { role });

           
            if (role === "admin") {
                toast.success("User promoted to Admin!");
            } else {
                toast.success("User demoted to Basic User!");
            }

            fetchUsers();
        } catch (error) {
            toast.error("Failed to update role!");
            console.log("Error updating role:", error);
        }
    };

    return (
        <div className="mt-10 bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Recent Users</h3>

            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Role</th>
                        <th className="text-left p-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u._id} className="border-b">
                            <td className="p-2">{u.username}</td>
                            <td className="p-2">{u.email}</td>
                            <td className="p-2 capitalize">{u.role}</td>

                            <td className="p-2 flex justify-center gap-2">
                                {u.role !== "admin" ? (
                                    <button
                                        onClick={() => updateRole(u._id, "admin")}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                    >
                                        Promote to Admin
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => updateRole(u._id, "user")}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                                    >
                                        Demote to User
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
