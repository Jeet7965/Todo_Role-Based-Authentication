import React, { useState, useEffect } from 'react';
import Input from '../component/FormInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../utils/urlApi';
import toast from 'react-hot-toast';
function EditTodo() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'Non-Urgent',
  });
  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await api.get(`/todos/${id}`);
        const todo = response.data.todos;

        const formattedTodo = {
          ...todo,
          dueDate: todo.dueDate ? todo.dueDate.slice(0, 10) : ''
        };

        setFormData(formattedTodo);
      } catch (error) {
        toast.error('Failed to fetch todo:', error.message);
      }
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/todos/${id}`, formData);
      toast.success("Task update successfully!")
      navigate('/');
    } catch (error) {
      toast.log("Add failed:", error.message);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Update Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter todo title"
        />

        {/* Description */}
        <Input
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter todo description"
        />

        {/* Due Date */}
        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="Urgent">Urgent</option>
            <option value="Non-Urgent">Non-Urgent</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Update Todo
          </button>

          <Link
            to="/"
            className="flex-1 text-center bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
