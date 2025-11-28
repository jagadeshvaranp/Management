import React from "react";
import { useLocation } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown"; // Import the new component

interface HeaderProps {
  handleLogout: () => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout, toggleSidebar }) => {
  const location = useLocation();

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/addnew": "Add New Product",
    "/categories": "Categories",
    "/products": "Static Analytics",
    "/invortry": "Inventory",
  };

  const title = titles[location.pathname.toLowerCase()] || "Stock Management";

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white flex justify-between h-20 p-5 border-b dark:border-gray-700 items-center">
      
      {/* === LEFT SECTION === */}
      <div className="flex items-center space-x-3 ml-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu />
        </button>

        <h3 className="font-bold text-xl">{title}</h3>
      </div>

      {/* === RIGHT SECTION === */}
      <div className="flex space-x-6 items-center mr-10">
        
        {/* Search Bar */}
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search inventory, orders..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-xs dark:placeholder-gray-400"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
            <Search size={16} />
          </div>
        </div>

        {/* User Profile Dropdown */}
        {/* This replaces the old J button and Logout button */}
        <ProfileDropdown handleLogout={handleLogout} />
        
      </div>
    </div>
  );
};

export default Header;