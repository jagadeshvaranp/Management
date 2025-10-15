import React from 'react'
import { ChevronRight } from 'lucide-react';
import { Bell } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Search } from 'lucide-react';
export default function Header() {
  return (
    <div className='bg-white text-2xl flex justify-between h-20  p-5 border-b'>
        {/* left */}
        <div className='flex space-x-3.5 ml-5'>
         
            <h3 className='font-bold'>Products</h3>
        </div>
          
        


      
        <div className='flex space-x-4.5 text-center mr-10'>

          {/* search */}
         <div className='relative w-80'>
         
          <input
           
            type="text"
            placeholder="Search Everething..."
              className="w-full bg-gray-100 border border-gray-200 text-sm text-gray-700 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
           </div>

           <div className=' w-9 h-9 border rounded-3xl text-center text-gray-500 hover:text-black'>
            <Bell  className='mt-1 ml-1  hover:font-bold'/>
           </div>
        <div className='space-x-2 hover:bg-gray-300 rounded-3xl p-1 mb-1 '>
          <button className='w-8 h-8 border rounded-3xl bg-gray-100 text-black relative'>J</button>
          <span className='text-sm font-medium mb-2 absolute ml-1'>Admin User</span>
          <span className='text-sm mt-3 text-gray-500'>perumalgamil.com</span>
          <button>
              <LogOut className='size-5 hover:text-red-500'/>
          </button>
          </div>
          
        
        </div>
    </div>
  )
}
