import React from 'react'
import Sidebar from './Sidebar'

const ManageCase = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
        <h1> Manage Case </h1>
      </div>
    </div>
  )
}

export default ManageCase