import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHospitalUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
//import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='bg-white px-0 py-5 '>
      <div className='flex items-center justify-around'>
        <div>
          <FontAwesomeIcon icon={faHospitalUser} className='w-8 h-8 hover:text-indigo-500'/>
        </div>
        <div className='md:flex hidden items-center gap-8'>
            <input className='rounded-lg border border-gray-600 py-2 px-3 w-full focus:outline-indigo-500' type="text" placeholder="Search" name="search"/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='w-8 h-8 hover:text-indigo-500'/>
        </div>
        <div>
          <button className='md:block hidden bg-indigo-500 text-white px-4 py-2 rounded-lg'>Add User</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar