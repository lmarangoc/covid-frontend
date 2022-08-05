import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { ToastContainer, toast } from 'react-toastify'
import { getUsers, createUser, editUser, deleteUser } from '../../utils/api'
import 'react-toastify/dist/ReactToastify.css'

const Admin = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getUsers(
        (response) => {
          console.log('The response received was', response);
          setUsers(response.data)
          setLoading(false)
        },
        (error) => {
          console.error('Error obtained:', error)
          setLoading(false)
        }
      )
    }
      fetchUsers()
  }, [])

  return (
    <div className='flex'>
      <div className='flex justify-center items-center'>
        <Sidebar/>
        <UsersTable loading={loading} usersList={users}/>
      </div>
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  )
}

const UsersTable = ({loading, usersList}) => {

  const [search, setSearch] = useState('')
  const [filterU, setFilterU] = useState(usersList)
  //const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setFilterU(
      usersList.filter((elemento) => 
        JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase()),
      )
    )
  }, [search, usersList])

  return (
    <div className='min-w-max h-full flex justify-center items-center'>
      <div className='flex justify-center items-center'>
        Hola
      </div>
    </div>
  )
}

export default Admin