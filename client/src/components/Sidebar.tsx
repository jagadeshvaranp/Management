import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  BookText,
  UserRound,
  Settings,
  LogOut,
  NotebookTabs,
} from "lucide-react";

interface SidebarProps {
  handleLogout: () => void;
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

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-6 space-y-2">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={ ({ isActive }) =>
            `flex w-full items-center px-4 py-3 gap-3  hidden rounded-2xl transition 
            ${isActive 
              ? "bg-cyan-500 text-white shadow-md" 
              : "text-gray-700 hover:bg-gray-200 hover:text-cyan-500"}`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        {/* Products */}
        <NavLink
          to="/addnew"
          className={({ isActive }) =>
            `flex w-full items-center px-4 py-3 gap-3 rounded-2xl transition 
            ${isActive 
              ? "bg-cyan-500 text-white shadow-md" 
              : "text-gray-700 hover:bg-gray-200 hover:text-cyan-500"}`
          }
        >
          <UserRound className="w-5 h-5" />
          Products
        </NavLink>

        {/* Categories */}
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex w-full items-center px-4 py-3 gap-3 rounded-2xl transition 
            ${isActive 
              ? "bg-cyan-500 text-white shadow-md" 
              : "text-gray-700 hover:bg-gray-200 hover:text-cyan-500"}`
          }
        >
          <NotebookTabs className="w-5 h-5" />
          Categories
        </NavLink>

        {/* Static Analytics */}
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex w-full items-center px-4 py-3 gap-3 hidden rounded-2xl transition 
            ${isActive 
              ? "bg-cyan-500 text-white shadow-md" 
              : "text-gray-700 hover:bg-gray-200 hover:text-cyan-500"}`
          }
        >
          <ChartNoAxesCombined className="w-5 h-5" />
          Static Analytics
        </NavLink>

        {/* Inventory */}
        <NavLink
          to="/invortry"
          className={({ isActive }) =>
            `flex w-full items-center px-4 py-3 gap-3 rounded-2xl hidden transition 
            ${isActive 
              ? "bg-cyan-500 text-white shadow-md" 
              : "text-gray-700 hover:bg-gray-200 hover:text-cyan-500"}`
          }
        >
          <BookText className="w-5 h-5" />
          Inventory
        </NavLink>

        {/* Settings (no route) */}
        <button
          className="flex w-full items-center px-4 py-3 gap-3 rounded-2xl hidden text-gray-700 hover:bg-gray-300 hover:text-cyan-500 transition"
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center hidden px-4 py-3 gap-3 rounded-2xl text-gray-700 hover:bg-gray-200 hover:text-red-500 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
