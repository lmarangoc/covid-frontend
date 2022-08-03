import React, { useState } from 'react'
import Control from '../../media/control.png'
import Logo from '../../media/logo.png'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faMagnifyingGlassLocation, faMapLocation, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {

  const[open, setOpen] = useState(true)

  return (
    <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-indigo-500 relative`}>
      <img 
        src={Control} 
        alt='Arrow left' 
        className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-indigo-500 ${!open && 'rotate-180'}`}
        onClick={() => setOpen(!open)}
      />
      <div>
        <Link to='/' className='flex gap-x-4 items-center'>
          <img 
            src={Logo} 
            alt='Logo'
            className={`h-10 cursor-pointer duration-500 ${open && 'rotate-[360deg]'} select-none`}
          />
          <h1 className={`text-white origin-left font-medium text-xl duration-300 select-none ${!open && 'scale-0'}`}> Home </h1>
        </Link>
      </div>
      <Menu open={open}/>
    </div>
  )
}

const Menu = ({ open }) => {
  return (
    <ul className='pt-6'>
      <Link to='/doctor'>
        <li className='text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'> 
          <FontAwesomeIcon icon={faUserDoctor} className='text-white h-6 w-6'/>
          <span className={`select-none ${!open && 'hidden'} origin-left duration-200`}> 
            Doctor
          </span>
        </li>
      </Link>
      <Link to='/doctor/searchcase'>
        <li className='text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9'>
          <FontAwesomeIcon icon={faMagnifyingGlassLocation} className='text-white h-6 w-6'/>
            <span className={`select-none ${!open && 'hidden'} origin-left duration-200`}> 
              Search Case 
            </span>
        </li>
      </Link>
      <Link to='/doctor/casemap'>
        <li className='text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
          <FontAwesomeIcon icon={faMapLocation} className='text-white h-6 w-6'/>
          <span className={`select-none ${!open && 'hidden'} origin-left duration-200`}> 
            Case Map
          </span>
        </li>
      </Link>
      <Link to='/'>
        <li className='text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9'>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-white h-6 w-6'/>
          <span className={`select-none ${!open && 'hidden'} origin-left duration-200`}> 
            Log Out
          </span>  
        </li>
      </Link>
    </ul>
  )
}

export default Sidebar