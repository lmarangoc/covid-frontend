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
      <div className='flex flex-col items-start px-10 py-7 flex-1 h-screen'>
        <p className='text-2xl font-semibold select-none'> Register new case </p>
        <form className='w-full mt-5 mb-5'>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2' for='name'>Name</label>
              <input type="text" name='name' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2' for='lastname'>Lastname</label>
              <input type="text" name='lastname' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2' for='idcard'>ID Card</label>
              <input type="number" name='idcard' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2' for='sex'>Sex</label>
              <div className='mt-1'>
                <select name="sex" required defaultValue={0} className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'>
                  <option disabled value={0}>Select the sex</option>
                  <option>Men</option>
                  <option>Woman</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2' for='birth'>Date of birth</label>
              <input type="date" name='birth' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2' for='residence'>Residence address</label>
              <input type="text" name='residence' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2' for='work'>Work address</label>
              <input type="text" name='work' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2' for='result'>Test result</label>
              <div className='mt-1'>
                <select name="result" required defaultValue={0} className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'>
                  <option disabled value={0}>Select the result</option>
                  <option>Positive</option>
                  <option>Negative</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2' for='exam'>Exam date</label>
              <input type="date" name='exam' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <button type='submit' className='bg-indigo-700 text-white w-full mt-6 px-4 py-2 rounded hover:bg-indigo-500 select-none'>
                Save Case
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterCase