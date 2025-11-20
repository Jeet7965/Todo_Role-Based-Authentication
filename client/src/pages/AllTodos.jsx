import React, { useEffect, useState } from 'react';
import api from '../utils/urlApi';
import { useNavigate } from 'react-router-dom';
function AllTodos() {
  const [todos, setTodos] = useState([]);
const navigate =useNavigate()
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get('/admin/todos'); 
        setTodos(response.data.todos); 
      } catch (err) {
        console.error('Failed to fetch todos:', err.message);
      }
    };

    fetchTodos();
  }, []);

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err.message);
    }
  };

  // Edit a todo (simple example: alert, can integrate with modal/form)
const handleEdit = (id) => {
  navigate(`/todo/edit/${id}`);
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Todos</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Due Date</th>
              <th className="py-2 px-4 border">User</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo._id} className="text-center">
                <td className="py-2 px-4 border">{todo.title}</td>
                <td className="py-2 px-4 border">{todo.description}</td>
                <td className="py-2 px-4 border">{todo.category}</td>
                <td className="py-2 px-4 border">{new Date(todo.dueDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">
                  {todo.userId ? `${todo.userId.username} (${todo.userId.email})` : 'N/A'}
                </td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => handleEdit(todo._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllTodos;
