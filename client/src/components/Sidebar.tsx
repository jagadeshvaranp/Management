import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  BookText,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  handleLogout: () => void; // Receive logout from parent
}

export default function Sidebar({ handleLogout }: SidebarProps) {
  return (
    <div className="w-60 h-screen bg-gradient-to-b from-gray-50 border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold">
          <span className="text-cyan-600">Inventory</span>
          <span className="text-gray-800">Pro</span>
        </h1>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 px-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex w-full items-center px-4 py-3 gap-2 rounded-2xl ${
              isActive
                ? "bg-cyan-500 text-white"
                : " hover:bg-gray-200 hover:text-cyan-400"
            }`
          }
        >
          <LayoutDashboard />
          <span className="text-base font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/addnew"
          className={({ isActive }) =>
            `flex w-full items-center mt-3 gap-2 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:bg-gray-200 hover:text-cyan-400"
            }`
          }
        >
          <UserRound />
          <span className="text-base font-medium">Products</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex w-full items-center mt-3 gap-2 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:bg-gray-200 hover:text-cyan-400"
            }`
          }
        >
          <UserRound />
          <span className="text-base font-medium">Categories</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `w-full flex items-center mt-3 gap-2 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:bg-gray-200 hover:text-cyan-400"
            }`
          }
        >
          <ChartNoAxesCombined />
          <span className="text-base font-medium">Static Analytics</span>
        </NavLink>

        <NavLink
          to="/invortry"
          className={({ isActive }) =>
            `w-full flex items-center mt-3 gap-2 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:bg-gray-200 hover:text-cyan-400"
            }`
          }
        >
          <BookText />
          <span className="text-base font-medium">Inventory</span>
        </NavLink>

        {/* Settings (no route yet) */}
        <button className="w-full flex items-center gap-2 px-4 py-3 mt-4 rounded-lg text-gray-600 hover:bg-gray-300 hover:text-cyan-400">
          <Settings />
          <span className="text-base font-medium">Setting</span>
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout} // ✅ Call parent logout function
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-red-500"
        >
          <LogOut />
          <span className="font-medium text-base">Logout</span>
        </button>
      </div>
    </div>
  );
}
