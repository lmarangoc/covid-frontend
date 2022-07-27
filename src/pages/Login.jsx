import React from 'react';
import Photo from '../media/medicine1.png';
import Logo from '../media/logo.png';

const Login = () => {
  return (
    <div className='flex'>
      <div className={`w-96 h-screen`}>
        <div className='p-7 flex flex-col '>
          <img className='mx-auto h-11 w-auto' src={Logo} alt='COVID-19 Tracker' />
          <h1> COVID-19 Tracker </h1>
          <h1> Log in to your account </h1>
        </div>
      </div>
      <div className='p-0 text-2xl font-semibold flex-1 h-screen'>
        <img className='mx-auto w-full h-full' src={Photo} alt='Medicine' />
      </div>
    </div>
  )
}

export default Login