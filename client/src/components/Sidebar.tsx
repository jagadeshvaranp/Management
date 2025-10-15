import {Link} from "react-router-dom";
import Footer from "./Footer";
import { LayoutDashboard } from 'lucide-react';
import { PackageSearch } from 'lucide-react';
import { ChartBarStacked } from 'lucide-react';
import { BaggageClaim } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { ChartSpline } from 'lucide-react';
import { ChartNoAxesCombined,BookText  } from 'lucide-react';
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
        {/* dashboard */}
        <Link to="/Dashboard">
          <button className="flex w-full  items-center px-4 py-3 gap-2 rounded-2xl bg-cyan-200 text-green-600 ${active === name ?}">
            <LayoutDashboard />
            <span className="text-base font-medium">Dashboard</span>
          </button>
          </Link> 

          {/* prodects */}
          <Link to="/products">
          <button className="w-full flex items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-cyan-400">
                <ChartNoAxesCombined />
            <span className="text-base font-medium">Statick Analytic</span>
          </button>
          </Link>
          
       
        
        {/* invertry */}
        <Link to="/Invortry">
        <button className="w-full flex items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-cyan-400">
          <BookText />
          <span className="text-base font-medium">Invortry</span>
        </button></Link>



        {/* customer */}
        <button className="flex w-full items-center mt-3 gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-cyan-400">
          <UserRound />
          <span className="text-base font-medium">Add New Task</span>
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
