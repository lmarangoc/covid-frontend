import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

const Navbar = () => {

  return (
    <nav className='py-5'>
      <div className='flex items-center justify-between'>
        <div className='relative group'> 
          <FontAwesomeIcon icon={faHospitalUser} className='w-10 h-10 text-indigo-500 hover:text-indigo-700'/>
          <div className='lg:absolute bg-gray-50 right-0 rounded p-2 hidden group-hover:block hover:block'>
            <ul className='space-y-2 lg:w-32'>
              <li className='flex p-2 font-medium text-gray-600 rounded'> 
                Admin Admin
              </li>
              <li className='flex p-2 font-medium text-indigo-500 rounded hover:bg-gray-200 hover:text-indigo-700'>
                <Link to='/'>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <input type="text" className='rounded border border-gray-600 py-2 px-3 w-64 focus:outline-indigo-500' placeholder="Search" name="search"/>
        </div>
        <div>
          <button className='bg-indigo-500 text-white px-4 py-2 rounded hover:rounded-full select-none'>
            Add User
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

