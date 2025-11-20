import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Singup from "./pages/Singup";
import Dashboard from "./pages/Dashborad";
import EditTodo from "./pages/EditTodo";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import CreateTodo from "./pages/CreateTodo";
import AdminRoute from "./Routes/AdminRoutes";
import AllTodos from "./pages/AllTodos";
import AdminLayout from "./component/AdminLayout";
function App() {

  return (
   <>
      <Toaster position="top-right" reverseOrder={false} />
    <Routes>

      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Singup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }

      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />  
        <Route path="/admin/todos" element={<AllTodos />} /> 
      </Route>

      <Route
        path="/todo/edit/:id"
        element={
          <ProtectedRoute>
            <EditTodo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todo/new"
        element={
          <ProtectedRoute>
            <CreateTodo />
          </ProtectedRoute>
        }
      />
    </Routes>
   </>
  );
}

export default App;
