import {Link} from "react-router-dom";
import Footer from "./Footer";
import { LayoutDashboard } from 'lucide-react';
import { PackageSearch } from 'lucide-react';
import { ChartBarStacked } from 'lucide-react';
import { BaggageClaim } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { ChartSpline } from 'lucide-react';
import { Hospital } from 'lucide-react';
import { Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';
export default function Sidebar() {
  return (
   <div className="w-60 h-screen bg-gradient-to-b from-gray-50  border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold">
          <span className="text-cyan-600">Inventory</span>
          <span className="text-gray-800">Pro</span>
        </h1>
      </div>

      {/* scroll */}

      <div className="flex-1 overflow-y-auto py-4 px-6 "> 
          <button className="flex w-full  items-center px-4 py-3 gap-2 rounded-2xl bg-cyan-200 text-green-600 ${active === name ?}">
            <LayoutDashboard />
            <span className="text-base font-medium">Dashboard</span>
          </button>
          {/* prodects */}
          <Link to="">
          <button className="w-full flex items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-cyan-400">
            <PackageSearch />
            <span className="text-base font-medium">Products</span>
          </button>
          </Link>
         <button className="w-full flex items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-cyan-400">
            <ChartBarStacked />
            <span className="text-base font-medium">Categories</span>
        </button>
        
        <Link to="/Orders">
        <button className="w-full flex items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-cyan-400">
           <BaggageClaim />
          <span className="text-base font-medium">Orders</span>
        </button></Link>

        <button className="flex w-full items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-cyan-400">
          <UserRound />
          <span className="text-base font-medium">Customers</span>
        </button>

        <button className="flex w-full items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200  hover:text-cyan-400">
          <Hospital />
          <span className="text-base font-medium">Suppliers</span>
        </button>
          
         <button className="flex w-full items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200  hover:text-cyan-400">
          <ChartSpline />
          <span className="text-base font-medium">Report</span>
        </button>
        
      
        
        <button className="w-full flex items-center gap-2 px-4 py-3 mt-4 rounded-lg text-gray-600 hover:bg-gray-300 hover:text-cyan-400">
           <Settings />
          <span className="text-base font-medium">Setting</span>
         </button>

        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200  hover:text-red-500">
          <LogOut />
          <span className="font-medium text-base">Logout</span>
        </button>
      </div>

    {/* footer */}
      
      
   </div>
  )
}
