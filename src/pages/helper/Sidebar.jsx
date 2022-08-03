import React, { useState } from 'react'
import Control from '../../media/control.png'
import Logo from '../../media/logo.png'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserPlus, faBarsProgress, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

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
      <Link to='/helper'>
        <li className='text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'> 
          <FontAwesomeIcon icon={faUser} className='text-white h-6 w-6'/>
          <span className={`select-none ${!open && 'hidden'} origin-left duration-200`}> 
            Helper
          </span>
        </li>
      </Link>
      <Link to='/helper/registercase'>
        <li className='text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9'>
          <FontAwesomeIcon icon={faUserPlus} className='text-white h-6 w-6'/>
            <span className={`select-none ${!open && 'hidden'} origin-left duration-200`}> 
              Register Case 
            </span>
        </li>
      </Link>
      <Link to='/helper/managecase'>
        <li className='text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
          <FontAwesomeIcon icon={faBarsProgress} className='text-white h-6 w-6'/>
          <span className={`select-none ${!open && 'hidden'} origin-left duration-200`}> 
            Manage Case 
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