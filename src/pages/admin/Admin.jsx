import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import { nanoid } from 'nanoid'
import { Dialog, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, faPencilAlt, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

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
    <div className='flex'>
      <Sidebar/>
      <UsersTable usersList={users} />
    </div>
  )
}

const UsersTable = ({ usersList }) => {

  const [search, setSearch] = useState('')
  const [filterU, setFilterU] = useState(usersList)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setFilterU(
      usersList.filter((elemento) =>
        JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase()),
      )
    )
  }, [search, usersList])

  return (
    <div className='w-full p-20'>
      <div className='flex flex-row items-center justify-evenly'>
        <input 
          placeholder="Search" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className='rounded border border-gray-400 py-2 px-3 w-3/12 focus:outline-indigo-500'
        />
        <button 
          onClick={() => setOpenModal((c) => !c)}
          type='submit'
          className='bg-indigo-500 text-white px-4 py-2 rounded hover:rounded-full select-none'
        >
          Add User
        </button>
      </div>
      <table className='w-11/12 mt-12 mb-12 text-lg text-left'>
        <thead className='bg-indigo-500 bg-opacity-100 text-white'>
          <tr>
            <th className='py-3 px-6 select-none'> Name </th>
            <th className='py-3 px-6 select-none'> Lastname </th>
            <th className='py-3 px-6 select-none'> ID Card </th>
            <th className='py-3 px-6 select-none'> Role </th>
            <th className='py-3 px-6 select-none'> User </th>
            <th className='py-3 px-6 select-none'> Password </th>
            <th className='py-3 px-6 select-none'> Action </th>
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
      <Modal stt={openModal} changeState={setOpenModal}/>
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
    <tr className='border-b hover:bg-gray-100'>
      { edit ? (
        <>
        <td>
          <input 
            type="text" 
            value={userInformation.name} 
            onChange={e => setUserInformation({...userInformation, name:e.target.value})} 
            className='bg-gray-100 border border-gray-600 p-2 rounded-lg m-2 w-full text-base'
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.lastname} 
            onChange={e => setUserInformation({...userInformation, lastname:e.target.value})} 
            className='bg-gray-100 border border-gray-600 p-2 rounded-lg m-2 w-full text-base'
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.idcard} 
            onChange={e => setUserInformation({...userInformation, idcard:e.target.value})} 
            className='bg-gray-100 border border-gray-600 p-2 rounded-lg m-2 w-full text-base'
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.role} 
            onChange={e => setUserInformation({...userInformation, role:e.target.value})} 
            className='bg-gray-100 border border-gray-600 p-2 rounded-lg m-2 w-full text-base'
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.user} 
            onChange={e => setUserInformation({...userInformation, user:e.target.value})} 
            className='bg-gray-100 border border-gray-600 p-2 rounded-lg m-2 w-full text-base'
          />
        </td>
        <td>
          <input 
            type="text" 
            value={userInformation.password} 
            onChange={e => setUserInformation({...userInformation, password:e.target.value})} 
            className='bg-gray-100 border border-gray-600 p-2 rounded-lg m-2 w-full text-base'
          />
        </td>
      </>
      ) : (
        <>
          <td className='py-4 px-6 text-base'> {user.name} </td>
          <td className='py-4 px-6 text-base'> {user.lastname} </td>
          <td className='py-4 px-6 text-base'> {user.idcard}  </td>
          <td className='py-4 px-6 text-base'> {user.role} </td>
          <td className='py-4 px-6 text-base'> {user.user} </td>
          <td className='py-4 px-6 text-base'> {user.password} </td>
        </>
      )}

      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirm edition' arrow>
                <FontAwesomeIcon icon={faCheck} 
                  onClick={() => setEdit(!edit)}
                  className='text-green-600 hover:text-green-500'
                />
              </Tooltip>
              <Tooltip title='Cancel edition' arrow>
                <FontAwesomeIcon icon={faBan} 
                  onClick={() => setEdit(!edit)}
                  className='text-red-600 hover:text-red-500'
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Edit user' arrow>
                <FontAwesomeIcon icon={faPencilAlt} 
                  onClick={() => setEdit(!edit)}
                  className='text-blue-600 hover:text-blue-500'
                />
              </Tooltip>
              <Tooltip title='Delete user' arrow>
                <FontAwesomeIcon icon={faTrash} 
                  onClick={() => setOpenDialog(true)}
                  className='text-red-600 hover:text-red-500'/>
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className='p-8 flex flex-col'>
            <h1 className='text-gray-900 text-2xl font-bold'>
              Are you sure you want to remove the user?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button onClick={() => setOpenDialog(false)} className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'>
                Sí
              </button>
              <button onClick={() => setOpenDialog(false)} className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'>
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>

    </tr>
  )
}

const Modal = ({ stt, changeState }) => {
  return (
    <div>
      <Dialog open={stt}>
        <div className='w-96 h-4/5'>
          <div className='flex justify-between items-start p-3 border-b'>
            <h1 className='text-3xl font-base select-none'> Register New User </h1>
            <button onClick={() => changeState(false)}>
              <FontAwesomeIcon 
                icon={faXmark} 
                className='w-6 h-6 p-2 text-gray-400 hover:bg-gray-200 rounded-lg'
              />
            </button>
          </div>
          <form>
            <div className='p-6'>
              <div className='border-b border-gray-400 pb-2 mb-3'>
                <input type="text" className='appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none' placeholder="Name" name="name" required />
              </div>
              <div className='border-b border-gray-400 py-2 mb-3'>
                <input type="text" className='appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none' placeholder="Lastname" name="lastname" required />
              </div>
              <div className='border-b border-gray-400 py-2 mb-3'>
                <input type="text" className='appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none' placeholder="ID Card" name="idcard" required />
              </div>
              <div className='border-b border-gray-400 py-2 mb-3'>
                <select className='w-full focus:outline-none text-gray-900 mr-3 py-1 pl-1 pr-2 leading-tight' name="role" required defaultValue={0}>
                  <option disabled value={0}> Select a role </option>
                  <option> doctor </option>
                  <option> helper </option>
                </select>
              </div>
              <div className='border-b border-gray-400 py-2 mb-3'>
                <input type="text" className='appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none' placeholder="Username" name="username" required />
              </div>
              <div className='border-b border-gray-400 py-2 mb-8'>
                <input type="password" className='appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none' placeholder="Password" name="password" required />
              </div>
              <button type='submit' 
              className='bg-indigo-700 text-white w-full px-4 py-2 rounded hover:bg-indigo-500 select-none'> 
                Save User
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  )
}

export default Admin