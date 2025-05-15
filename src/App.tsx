import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminMenuPage from "./pages/AdminMenuPage";
import MenuListPage from "./pages/MenuListPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple header with navigation links */}
        <header className="bg-white shadow p-4 flex justify-center space-x-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Menu List
          </Link>
          <Link
            to="/admin"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Admin Panel
          </Link>
        </header>

        {/* Main content */}
        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<MenuListPage />} />
            <Route path="/admin" element={<AdminMenuPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
