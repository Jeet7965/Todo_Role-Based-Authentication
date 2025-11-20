MERN Todo App (Authentication + Admin Panel + User Roles)

A complete MERN stack application with secure authentication, user roles, JWT-based login system, todo management, and an admin dashboard to manage users and roles.

This project includes:

User Authentication (Register/Login/Logout)

JWT + bcrypt security

Role-based access → User / Admin

Todo CRUD operations

Admin: Manage users, update roles, delete accounts

Protected routes (frontend + backend)

React + Tailwind UI

Node.js + Express API

MongoDB database (Mongoose)

Context API for global auth

Clean folder structure



Project Overview

This Todo application allows users to manage their tasks securely.
The user can create, update, delete, and categorize todos.

Admins can:

View all users

Change user roles

Delete users

Access admin-only APIs

It is built for real-world use, following production-level folder structure and best practices

Tech Stack
Frontend

React.js

Vite

Tailwind CSS

Axios

React Router

Context API

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt.js

CORS


Features


🔐 Authentication

Register

Login

Logout

Auto-login with stored JWT

Password encrypted using bcrypt

📝 Todo Management

Create a todo

Edit todo

Delete todo

Todo with:

Title

Description

Due date

Category (Urgent / Non-Urgent)

Each user sees only their todos

👑 Admin Dashboard

View all registered users

Update user role (User ➝ Admin)

Delete user accounts

Access admin-only protected routes

🧰 Other Features

Fully responsive UI

Token stored in localStorage

Middleware-based role protection

Error-handled backend APIs

Clean UI with Tailwind

mern-todo-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── utils/
    │   └── App.jsx
    ├── public/


Environment Variables
  (.env)
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key


Backend Setup
cd backend
npm install express  mongoose cors jsonwebtoken bcrypt

Frontend Setup
cd frontend
npm install axios react-router-dom react-router

