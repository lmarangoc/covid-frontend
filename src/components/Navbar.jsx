import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../media/logo.png';

const Navbar = () => {
  return (
    <nav className='bg-indigo-500 px-2 py-2.5'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <Link to='/'>
          <img className='mr-3 h-6 sm:h-9 select-none' src={Logo} alt='COVID-19 Tracker' />
        </Link>
        <div>
          <ul>
            <li className='block py-2 pr-4 pl-3 text-white rounded-lg shadow-md hover:bg-blue-900'>
              <Link to='/login' className='select-none'>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar