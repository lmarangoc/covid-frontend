import React from 'react'
import Sidebar from './Sidebar'

const SearchCase = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
        <h1> Search Case </h1>
      </div>
    </div>
  )
}

export default SearchCase