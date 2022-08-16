import React from 'react'
import Sidebar from 'components/Sidebar'
import imgHelper from 'media/helper.png'
import { Link } from "react-router-dom"

const Helper = () => {

  const Menus = [
    { title: "Helper", icon: "fa-solid fa-user fa-2x", route: '/helper' },
    { title: "Register Case", icon: "fa-solid fa-user-plus fa-2x", route: '/helper/registercase', gap: true },
    { title: "Manage Case", icon: "fa-solid fa-bars-progress fa-2x", route: '/helper/managecase' },
    { title: "Log Out", icon: "fa-solid fa-arrow-right-from-bracket fa-2x", route: "/", gap: true },
  ]

  return (
    <div className='flex'>
      <Sidebar menus={Menus}/>
      <div className='container flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-row mx-auto items-start'>
          <Link to='/helper/registercase'>
            <button className='bg-indigo-500 text-white w-32 px-4 py-2 rounded hover:rounded-full select-none mr-10'>Register Case</button>
          </Link>
          <Link to='/helper/managecase'>
            <button className='bg-indigo-500 text-white w-32 px-4 py-2 rounded hover:rounded-full select-none'>Manage Case</button>
          </Link>
        </div>
        <img className='mx-auto h-4/5 w-auto' src={imgHelper} alt='Helper' />
      </div>
    </div>
  )
}

export default Helper