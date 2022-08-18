import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { nanoid } from 'nanoid'

const HomeNavbar = () => {

  const menus = [
    { title: "Sign In", route: "/login"},
  ]

  const [open, setOpen] = useState(false)

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-indigo-500 py-4 md:px-10 px-7'>
        <Link to='/'>
          <div className='font-bold text-3xl text-white flex items-center'>
            <ion-icon name="medical-outline"></ion-icon>
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
            <Link to={menu.route} key={nanoid()} className='text-gray-100 hover:text-white'>
              <li className='md:ml-8 text-lg select-none md:my-0 my-7'>
                {menu.title}
              </li>
            </Link>
          )
          )}
          <Link to="/login">
            <button className='bg-gray-100 text-indigo-500 hover:bg-white py-2 px-6 rounded md:ml-8 select-none'>
              Sign In
            </button>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default HomeNavbar