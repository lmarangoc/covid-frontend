import React, { useState } from 'react'
import Control from 'media/control.png'
import Logo from 'media/logo.png'
import { Link } from "react-router-dom"
import { nanoid } from 'nanoid'

const Sidebar = ({ menus }) => {

  const[open, setOpen] = useState(true)

  return (
    <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-indigo-500 relative`}>
      <img 
        src={Control} 
        alt="Responsive Sidebar" 
        className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-indigo-500 ${!open && 'rotate-180'}`}
        onClick={() => setOpen(!open)}
      />
      <div className='flex gap-x-4 items-center'>
        <Link to='/' className='flex gap-x-4 items-center'>
          <img 
            src={Logo} 
            alt='Logo'
            className='h-10 duration-500 select-none'
          />
          <h1 className={`text-white origin-left font-medium text-xl duration-300 select-none ${!open && 'scale-0'}`}> Home </h1>
        </Link>
      </div>
      <ul className='pt-6'>
        {menus.map((menu, index) => (
          <Link to={menu.route} key={nanoid()}>
            <li
            className={`flex rounded-md p-2 hover:bg-light-white text-gray-100 text-sm items-center gap-x-4 
            ${menu.gap ? "mt-12" : "mt-5"} 
            ${ index === 0 && "bg-light-white"}`}
            > 
              <i className={`${menu.icon}`}/>
              <span className={`${!open && "hidden"} origin-left duration-200 select-none`}>
                {menu.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar