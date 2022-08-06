import React from 'react'
import Sidebar from 'components/Sidebar'

const Doctor = () => {

  const Menus = [
    { title: "Doctor", icon: "fa-solid fa-user-doctor fa-2x", route: '/doctor' },
    { title: "Search Map", icon: "fa-solid fa-magnifying-glass-location fa-2x", route: '/doctor/searchcase', gap: true },
    { title: "Case Map", icon: "fa-solid fa-map-location fa-2x", route: '/doctor/casemap' },
    { title: "Log Out", icon: "fa-solid fa-arrow-right-from-bracket fa-2x", route: "/", gap: true },
  ]

  return (
    <div className='flex'>
      <Sidebar menus={Menus}/>
      <div className='p-7 flex-1 h-screen'>
        Doctor
      </div>
    </div>
  )
}

export default Doctor