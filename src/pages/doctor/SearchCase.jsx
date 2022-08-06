import React from 'react'
import Sidebar from 'components/Sidebar'

const SearchCase = () => {

  const Menus = [
    { title: "Doctor", icon: "fa-solid fa-user-doctor fa-2x", route: '/doctor' },
    { title: "Search Map", icon: "fa-solid fa-magnifying-glass-location fa-2x", route: '/doctor/searchcase', gap: true },
    { title: "Case Map", icon: "fa-solid fa-map-location fa-2x", route: '/doctor/casemap' },
    { title: "Log Out", icon: "fa-solid fa-arrow-right-from-bracket fa-2x", route: "/", gap: true },
  ]

  return (
    <div className='flex'>
      <Sidebar menus={Menus}/>
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
        <h1> Search Case </h1>
      </div>
    </div>
  )
}

export default SearchCase