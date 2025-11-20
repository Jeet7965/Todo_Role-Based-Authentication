import React from 'react';

// Reusable Input Component with Tailwind (supports textarea)
function Input({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
        >
          {label}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4} // default 4 rows
          className="
            w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 text-sm sm:text-base resize-none
          "
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            px-4
            py-2
            border
            border-gray-300
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            text-sm sm:text-base
          "
        />
      )}
    </div>
  );
}

export default Input;
