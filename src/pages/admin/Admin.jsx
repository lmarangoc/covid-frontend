import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { nanoid } from 'nanoid'
import { Dialog, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

const usersBackend = [
  {
    name: "Jennie",
    lastname: "Kim",
    idcard: "200107320",
    role: "doctor",
    user: "jkin",
    password: "jk7320",
  },
  {
    name: "Lalisa",
    lastname: "Manobal",
    idcard: "200107321",
    role: "helper",
    user: "lmanobal",
    password: "lm7321",
  },
  {
    name: "Jisoo",
    lastname: "Kim",
    idcard: "200107322",
    role: "doctor",
    user: "jikim",
    password: "jk7322",
  },
  {
    name: "Roseanne",
    lastname: "Park",
    idcard: "200107323",
    role: "helper",
    user: "rpark",
    password: "rp7323",
  },
  {
    name: "Taylor",
    lastname: "Swift",
    idcard: "200107324",
    role: "doctor",
    user: "tswift",
    password: "ts7324",
  },
]

const Admin = () => {

  const [users, setUsers] = useState([])

  useEffect( () => {
    setUsers(usersBackend)
  }, [])

  return (
    <div className='px-52'>
      <Navbar/>
      <UsersTable usersList={users} />
    </div>
  )
}

const UsersTable = ({ usersList }) => {

  const [search, setSearch] = useState('')
  const [filterU, setFilterU] = useState(usersList)

  useEffect(() => {
    setFilterU(
      usersList.filter((elemento) =>
        JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase()),
      )
    )
  }, [search, usersList])

  return (
    <div className='container w-full pt-10'>
      <div className='flex flex-row items-center justify-around'>
        <input 
          placeholder="Search" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className='rounded border border-gray-600 py-2 px-3 w-5/12 focus:outline-indigo-500'
        />
        <button 
          className='bg-indigo-500 text-white px-4 py-2 rounded hover:rounded-full select-none'
        >
          Add User
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Lastname </th>
            <th> ID Card </th>
            <th> Role </th>
            <th> User </th>
            <th> Password </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {filterU.map((user) => {
            return (
              <UserRow key={nanoid()} user={user}/>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const UserRow = ({user}) => {

  const [edit, setEdit] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [userInformation, setUserInformation] = useState({
    name: user.name,
    lastname: user.lastname,
    idcard: user.idcard,
    role: user.role,
    user: user.user,
    password: user.password,
  })

  return (
    <tr>
      { edit ? (
        <>
        <td>
          <input 
            type="text" 
            value={userInformation.name} 
            onChange={e => setUserInformation({...userInformation, name:e.target.value})} 
            className=''
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.lastname} 
            onChange={e => setUserInformation({...userInformation, lastname:e.target.value})} 
            className=''
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.idcard} 
            onChange={e => setUserInformation({...userInformation, idcard:e.target.value})} 
            className=''
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.role} 
            onChange={e => setUserInformation({...userInformation, role:e.target.value})} 
            className=''
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.user} 
            onChange={e => setUserInformation({...userInformation, user:e.target.value})} 
            className=''
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.password} 
            onChange={e => setUserInformation({...userInformation, password:e.target.value})} 
            className=''
          />
        </td>
      </>
      ) : (
        <>
          <td> {user.name} </td>
          <td> {user.lastname} </td>
          <td> {user.idcard} </td>
          <td> {user.role} </td>
          <td> {user.user} </td>
          <td> {user.password} </td>
        </>
      )}

      <td>
        <div>
          {edit ? (
            <>
              <Tooltip title='Confirm edition' arrow>
                <FontAwesomeIcon icon={faCheck} 
                  onClick={() => setEdit(!edit)}
                  className='text-green-700 hover:text-green-500'
                />
              </Tooltip>
              <Tooltip title='Cancel edition' arrow>
                <FontAwesomeIcon icon={faBan} 
                  onClick={() => setEdit(!edit)}
                  className='text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Edit user' arrow>
                <FontAwesomeIcon icon={faPencilAlt} 
                  onClick={() => setEdit(!edit)}
                  className='text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Delete user' arrow>
                <FontAwesomeIcon icon={faTrash} 
                  onClick={() => setOpenDialog(true)}
                  className='text-red-700 hover:text-red-500'/>
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div>
            <h1>
              Are you sure you want to remove the user?
            </h1>
            <div>
              <button onClick={() => setOpenDialog(false)}>
                Sí
              </button>
              <button onClick={() => setOpenDialog(false)}>
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>

    </tr>
  )
}

export default Admin