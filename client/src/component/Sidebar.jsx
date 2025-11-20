import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Sidebar() {

    const {logout}=useContext(AuthContext)
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="block p-2 rounded hover:bg-gray-700">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/todos" className="block p-2 rounded hover:bg-gray-700">
           All Todo
          </Link>
        </li>

        <li>
          <button  onClick={logout} className="block p-2 rounded hover:bg-gray-700">
          LogOut
          </button>
        </li>
      </ul>
    </div>
  );
}
