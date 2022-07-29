import React from 'react'
import Navbar from './Navbar'

const users = [
  {
    name: "Jennie",
    lastname: "Kim",
    idcard: "200107320",
    role: "doctor",
    user: "jkin",
    //password:
  },
  {
    name: "Lalisa",
    lastname: "Manobal",
    idcard: "200107321",
    role: "helper",
    user: "lmanobal",
    //password:
  },
  {
    name: "Jisoo",
    lastname: "Kim",
    idcard: "200107322",
    role: "doctor",
    user: "jikim",
    //password:
  },
  {
    name: "Roseanne",
    lastname: "Park",
    idcard: "200107323",
    role: "helper",
    user: "rpark",
    //password:
  },
  {
    name: "Taylor",
    lastname: "Swift",
    idcard: "200107324",
    role: "doctor",
    user: "tswift",
    //password:
  },
]

const Admin = () => {
  return (
    <div className='px-52'>
      <Navbar/>
    </div>
  )
}

export default Admin