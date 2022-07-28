import React from 'react';
import Photo from '../media/medicine1.png';
import LogoImage from '../components/LogoImage';
import { Link } from "react-router-dom";

const Login = () => {

  return (
    <div className='flex'>
      <div className={`w-80 h-screen bg-indigo-500`}>
        <div className='pt-12'>
          <Link to='/'>
            <LogoImage/> 
          </Link>
        </div>
        <div className='pt-7 flex justify-center justify-items-start'>
          <p className='font-open text-2xl text-white select-none'> Log in to your account </p>
        </div>
        <div className='w-full max-w-xs'>
          <form onSubmit={(e) => { e.preventDefault();}} className='px-8 mt-5 pt-10 pb-8 mb-4'>
            <div className='mb-8'>
              <label className='block text-white text-base font-medium mb-2 select-none' for="username">
                Username
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-cyan-700 focus:border-cyan-700 focus:z-10 ' type="text" placeholder="username" name="username" required />
            </div>
            <div class="mb-8">
              <label className='block text-base text-white font-medium mb-2 select-none' for="password">
                Password
              </label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-cyan-700 focus:border-cyan-700 focus:z-10 ' type="password" placeholder="**********" name="password" required/>
            </div>
            <div className='flex items-center justify-center'>
              <Link to='/admin'>
                <button className='bg-blue-900 hover:bg-blue-700 text-white text-lg font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:shadow-outline' type="submit">
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className='px-14 py-0 md:flex hidden justify-center items-center h-screen'>
        <img className='mx-auto w-full h-full' src={Photo} alt='Medicine' />
      </div>
    </div>
  )
}

export default Login