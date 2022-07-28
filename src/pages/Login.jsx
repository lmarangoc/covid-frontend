import React from 'react'
import { Link } from "react-router-dom"
import LogoImage from "../components/LogoImage"

const Login = () => {

  return (
    <div className='flex flex-col justify-center justify-items-center'>
      <div className='pt-12'>
        <Link to='/'>
          <LogoImage/> 
        </Link>
      </div>
      <div className='pt-7 flex justify-center justify-items-center'>
        <p className='text-2xl font-light select-none'> Log in to your account </p>
      </div>
      <div className='pt-12 flex justify-center justify-items-center'>
        <form className='shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-300'>
          <div className='border-b border-indigo-500 py-2 mb-4'>
            <input type="text" className='appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none' placeholder="username" name="username" required/>
          </div>
          <div className='border-b border-indigo-500 py-2 mb-8'>
            <input type="password" className='appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none' placeholder="password" name="password" required />
          </div>
          <div className='flex justify-center justify-items-center'>
            <Link to='/admin' className='w-full'>
              <button type='submit' className='bg-indigo-500 text-white w-full px-4 py-2 rounded hover:bg-indigo-700 select-none'> 
                Login 
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
