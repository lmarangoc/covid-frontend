import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { nanoid } from 'nanoid'
import { Tooltip } from '@material-ui/core'
import { IoLogOutOutline, IoMedicalOutline } from 'react-icons/io5'

const Navbar = ({ menus }) => {

  const [open, setOpen] = useState(false)

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-indigo-500 py-4 md:px-10 px-7'>
        <Link to='/'>
          <div className='font-bold text-white flex items-center'>
            <IoMedicalOutline size={30}/>
            <span className='text-2xl mx-1 select-none'>
              COVID-19 Tracker
            </span>
          </div>
        </Link>
        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-4 cursor-pointer md:hidden text-white'>
          <ion-icon name={ open ? 'close' : 'menu' }></ion-icon>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-indigo-500 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
          {menus.map((menu) => (
            <Link to={menu.route} key={nanoid()} className='text-white hover:text-gray-300'>
              <li className='md:ml-8 text-lg select-none md:my-0 my-7'>
                {menu.title}
              </li>
            </Link>
          )
          )}
          <Link to='/'>
            <Tooltip title='Log Out' arrow>
              <div>
                <IoLogOutOutline size={40} className='text-gray-100 hover:text-gray-300 md:ml-8'/> 
              </div>
            </Tooltip>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar