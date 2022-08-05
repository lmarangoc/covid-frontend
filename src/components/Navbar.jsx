import React from 'react'
import { Link } from "react-router-dom";
import Logo from 'media/logo.png';

const Navbar = () => {
  return (
    <nav className='py-5'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <Link to='/'>
          <img className='h-10 select-none' src={Logo} alt='COVID-19 Tracker' />
        </Link>
        <div>
          <ul>
            <li>
              <Link to='/login'>
                <button className='bg-indigo-500 text-white w-full px-4 py-2 rounded hover:rounded-full select-none'>
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