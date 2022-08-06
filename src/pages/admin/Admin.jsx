import React, { useState, useEffect } from 'react'
import Sidebar from 'components/Sidebar'
import { ToastContainer, toast } from 'react-toastify'
import { getUsers, createUser, editUser, deleteUser } from 'utils/api'
import 'react-toastify/dist/ReactToastify.css'

const Admin = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getUsers(
        (response) => {
          console.log('users', response.data);
          setUsers(response.data)
          setLoading(false)
        },
        (error) => {
          console.log(error)
          setLoading(false)
        }
      )
    }
      fetchUsers()
  }, [])

  const Menus = [
    { title: "Admin", icon: "fa-solid fa-hospital-user fa-2x", route: '/admin' },
    { title: "Log Out", icon: "fa-solid fa-arrow-right-from-bracket fa-2x", route: "/", gap: true },
  ]

  return (
    <div className='flex'>
      <Sidebar menus={Menus}/>
      <UsersTable loading={loading} usersList={users}/>
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
    <div className='p-7 flex-1 h-screen'>
      Hola
    </div>
  )
}

export default Admin