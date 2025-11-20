import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}
