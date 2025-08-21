import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home", icon: "fa-home" },
  { path: "/calculator", label: "Calculator", icon: "fa-calculator" },
  { path: "/news", label: "News", icon: "fa-newspaper" },
  { path: "/shop", label: "Shop", icon: "fa-shopping-cart" },
  { path: "/live", label: "Live", icon: "fa-map-marker-alt" },
  { path: "/ecocenter", label: "Ecocenter", icon: "fa-leaf" },
  { path: "/carpool", label: "Carpool", icon: "fa-car" },
  { path: "/chatbot", label: "Chatbot", icon: "fa-robot" },
  { path: "/dashboard", label: "Dashboard", icon: "fa-chart-line" },
];

const Navbar = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    setUser(null);
    onLogout?.();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 shadow-md p-4 flex justify-between items-center border-b border-gray-700">
      {/* Logo */}
      <NavLink
        to="/"
        className="text-green-400 font-bold text-xl flex items-center gap-2"
      >
        <i className="fas fa-leaf" />
        <span>Carbo</span>
      </NavLink>

      {/* Navigation Menu */}
      <ul className="flex gap-6 text-sm md:text-base">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-1 rounded transition ${
                  isActive
                    ? "text-green-400 font-semibold bg-gray-800"
                    : "text-gray-300 hover:text-green-400 hover:bg-gray-800"
                }`
              }
            >
              <i className={`fas ${link.icon}`} />
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Profile Dropdown */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center cursor-pointer uppercase"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.name?.charAt(0)}
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
              <div className="px-4 py-2 text-white border-b border-gray-700">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={handleLogoutClick}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
