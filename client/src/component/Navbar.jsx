export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
}
