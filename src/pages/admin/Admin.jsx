import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
//import { nanoid } from 'nanoid'
//import ReactLoading from 'react-loading'
import { Dialog, Tooltip } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUsers, createUser, editUser, deleteUser } from '../../utils/api'
//import { faCheck, faBan, faPencilAlt, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

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
      <Sidebar/>
      <UsersTable loading={loading} usersList={users}/>
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  )
}

const UsersTable = () => {
  
  return (
    <div>
      Hola
    </div>
  )
}



export default Admin