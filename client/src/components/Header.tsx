

import React from "react";
import { LogOut, Search } from "lucide-react";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  return (
    <div className="bg-white text-2xl flex justify-between h-20 p-5 border-b items-center">
      {/* Left section */}
      <div className="flex space-x-3.5 ml-5 items-center">
        <h3 className="font-bold text-xl">Stock Management</h3>
      </div>

      {/* Right section */}
      <div className="flex space-x-6 items-center mr-10">
        {/* Search bar */}
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search inventory, orders..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-xs"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </div>
        </div>

        {/* User / Logout */}
        <div className="flex items-center space-x-2 hover:bg-gray-300 rounded-3xl p-1">
          <button className="w-8 h-8 border rounded-3xl bg-gray-100 text-black flex items-center justify-center">
            J
          </button>
          <button onClick={handleLogout}>
            <LogOut size={20} className="hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
