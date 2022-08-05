import React from 'react'
import Logo from 'media/logo.png';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@material-ui/core';

const Navbar = () => {

  return (
    <nav className='py-5'>
      <div className='flex items-center justify-between'>
        <Link to='/'>
          <img className='h-10 select-none' src={Logo} alt='COVID-19 Tracker' />
        </Link>
        <h1 className='text-4xl font-light select-none'> All Users </h1>
        <div className='relative group'>
          <Tooltip title='User settings' arrow placement='right'>
            <FontAwesomeIcon icon={faHospitalUser} className='w-10 h-10 text-indigo-500 hover:text-indigo-700'/>
          </Tooltip>
          <div className='lg:absolute bg-gray-50 w-36 right-0 rounded p-2 hidden group-hover:block hover:block'>
            <ul className='py-1 font-normal'>
              <li className='py-2 px-4 text-gray-600 select-none'>Laura Arango</li>
              <li className='py-2 px-4 text-gray-600 select-none border-b border-gray-300'>Role: Admin</li>
              <li className='py-2 px-4 text-indigo-500 hover:bg-gray-100 select-none'>
                <Link to='/'>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

