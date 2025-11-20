import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TodoCard from "../component/TodoCard";
import api from "../utils/urlApi";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { auth, logout } = useContext(AuthContext);
  const user = auth?.user;
  const navigate = useNavigate();

  const [viewAll, setViewAll] = useState(false);
  const [personalTodos, setPersonalTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    fetchMyTodos();
    if (user?.role === "admin") fetchAllTodos();
  }, []);

  //  Fetch current user's todos
  const fetchMyTodos = async () => {
    try {
      const resp = await api.get("/todos");
      setPersonalTodos(resp.data.todos);
    } catch (err) {
      toast.error("Failed to load your todos!");
    }
  };

  //  Fetch ALL todos (admin only)
  const fetchAllTodos = async () => {
    try {
      const resp = await api.get("/admin/todos");
      setAllTodos(resp.data.todos);
    } catch (err) {
      toast.error("Failed to load all todos!");
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      toast.success("Todo deleted successfully!");
      viewAll ? fetchAllTodos() : fetchMyTodos();
    } catch (err) {
      toast.error("Failed to delete todo!");
    }
  };

  //  Edit Todo
  const editTodo = (todo) => {
    navigate(`/todo/edit/${todo._id}`);
  };

  //  Toggle task completion ✓
  const toggleComplete = async (todo) => {
    try {
      if (todo.completed) return;
      await api.put(
        `/todos/${todo._id}`,
        { completed: true }
      );
      toast.success(
        todo.completed ? "Task marked incomplete!" : "Task completed!"
      );
      viewAll ? fetchAllTodos() : fetchMyTodos();
    } catch (err) {
      toast.error("Failed to update task!");
    }
  };

  const todosToShow =
    user?.role === "admin" && viewAll ? allTodos : personalTodos;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">

      {/* Navbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Todo Dashboard
        </h1>

        <div className="flex justify-center mt-8">
          <Link
            to="/todo/new"
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700 shadow-md"
          >
            + Add New Task
          </Link>
        </div>

        <button
          onClick={() => {
            logout();
            toast.success("Logged out successfully!");
          }}
          className="bg-red-500 w-full sm:w-auto text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Admin Toggle */}
      {user?.role === "admin" && (
        <button
          onClick={() => setViewAll(!viewAll)}
          className="bg-blue-600 w-full sm:w-auto text-white px-5 py-2 rounded-lg mb-5 hover:bg-blue-700"
        >
          {viewAll ? "Show My Todos" : "Show All Todos"}
        </button>
      )}

      {/* Todo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {todosToShow.map((todo) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            onEdit={editTodo}
            onDelete={deleteTodo}
            onToggle={toggleComplete} 
          />
        ))}
      </div>
    </div>
  );
}
