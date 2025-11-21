export default function TodoCard({ todo, onEdit, onDelete, onToggle }) {


  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition flex flex-col justify-between">

      {/* Title + Checkbox */}
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
          {todo.title}
        </h2>

        <input
          type="checkbox"
          checked={todo.completed}
          disabled={todo.completed} 
          onChange={() => onToggle(todo)}

          className="h-5 w-5 accent-green-600 cursor-pointer"
        />
      </div>

      {/* Description */}
      <p className="text-gray-600 text-l mt-2">
        {todo.description}
      </p>

      {/* Category + Status + Date in ONE LINE */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mt-3 flex-wrap">

        {/* Category */}
        <span>
          <span className="font-semibold text-indigo-600">Category:</span> {todo.category}
        </span>

        {/* Status */}
        <span>
          <span className="font-semibold">Status:</span>{" "}
          <span className={todo.completed ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </span>

        {/* Created Date */}
        <span>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(todo.createdAt).toLocaleDateString()}
        </span>

      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-5">
        <button
          onClick={() => onEdit(todo)}
          className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm w-full mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm w-full ml-2"
        >
          Delete
        </button>
      </div>

    </div>
  );
}
