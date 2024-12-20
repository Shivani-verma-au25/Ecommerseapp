import React from 'react'
import { Button } from '../ui/button'
import { LogOutIcon, Menu } from 'lucide-react'

function AdminHeader() {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button className ="lg:hidden sm:block">
        <Menu />
        <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end '>
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"><LogOutIcon  />Logout</Button>
      </div>
    </header>
  )
}

export default AdminHeader