import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../media/logo.png';

const Navbar = () => {
  return (
    <nav className='px-2 py-2.5'>
      <div className='container flex flex-wrap items-center justify-around mx-auto'>
        <Link to='/'>
          <img className='mr-3 h-6 sm:h-9 select-none' src={Logo} alt='COVID-19 Tracker' />
        </Link>
        <div>
          <ul>
            <li>
              <Link to='/login'>
                <button className='bg-indigo-500 text-white w-full px-4 py-2 rounded hover:bg-indigo-700 select-none'>
                  Sign In
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar