import React from 'react'
import { Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';

export default function Footer() {
  return (
    <div className='h-20  flex-1 border-t px-4 py-5 space-y-4 '>
      <button>
        <Settings />
        <span>Setting</span>
      </button>

      <button>
        <LogOut />
        <span>Logout</span>
      </button>
        
    </div>
  )
}
