import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
    const { auth } = useContext(AuthContext);

    // Try to fallback to localStorage if auth is null
    const token = auth?.token || localStorage.getItem("token");
    const user = auth?.user || JSON.parse(localStorage.getItem("user") || "null");

    if (!token) return <Navigate to="/login" replace />;
    if (user?.role !== "admin") return <Navigate to="/" />;

    return children;
}
