import React from 'react'
import Sidebar from 'components/Sidebar'

const RegisterCase = () => {

  const Menus = [
    { title: "Helper", icon: "fa-solid fa-user fa-2x", route: '/helper' },
    { title: "Register Case", icon: "fa-solid fa-user-plus fa-2x", route: '/helper/registercase', gap: true },
    { title: "Manage Case", icon: "fa-solid fa-bars-progress fa-2x", route: '/helper/managecase' },
    { title: "Log Out", icon: "fa-solid fa-arrow-right-from-bracket fa-2x", route: "/", gap: true },
  ]

  return (
    <div className='flex'>
      <Sidebar menus={Menus}/>
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
        <h1> Register Case </h1>
      </div>
    </div>
  )
}

export default RegisterCase