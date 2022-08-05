import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { nanoid } from 'nanoid'
import ReactLoading from 'react-loading'
import { Dialog, Tooltip } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUsers, createUser, editUser, deleteUser } from '../../utils/api'
import { faCheck, faBan, faPencilAlt, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

const Admin = () => {

  const [users, setUsers] = useState([])
  const [runQuery, setRunQuery] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getUsers(
        (response) => {
          console.log('The response received was', response);
          setUsers(response.data)
          setRunQuery(false)
          setLoading(false)
        },
        (error) => {
          console.error('Error obtained:', error)
          setLoading(false)
        }
      )
    }
    console.log('query', runQuery)
    if (runQuery) {
      fetchUsers()
      setRunQuery(true)
    }
  }, [runQuery])

  return (
    <div className='flex justify-center items-center'>
      <Sidebar/>
      <UsersTable loading={loading} usersList={users} setRunQuery={setRunQuery}/>        
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  )
}

const UsersTable = ({ loading, usersList, setRunQuery}) => {

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
    <div className='w-full h-full flex justify-center items-center'>
      <div  className='rounded-xl shadow-lg w-10/12 bg-gray-50'>
        <div className='my-8 mr-8 ml-0 p-6 '>
          <div className='flex flex-row items-center justify-evenly'>
            <input 
            placeholder="Search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className='bg-gray-50 rounded border border-gray-400 py-2 px-3 w-4/12 focus:outline-indigo-500'
            />
            <button 
              onClick={() => setOpenModal((c) => !c)}
              type='submit'
              className='bg-indigo-500 text-white px-4 py-2 rounded hover:rounded-full select-none'
            >
              Add User
            </button>
          </div>
          {loading ? (
            <ReactLoading type='spokes' color='#6366f1' height={667} width={375} />
          ) : (
            <table className='w-full mt-8 mb-8 text-lg text-left'>
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
                    <UserRow key={nanoid()} user={user} setRunQuery={setRunQuery}/>
                  )
                })}
              </tbody>
            </table>
          )}
        <Modal stt={openModal} changeState={setOpenModal} />
        </div>
      </div>
    </div>
  )
}

const UserRow = ({user, setRunQuery}) => {

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

  const updateUser = async () =>{
    await editUser(
      user._id,
      userInformation,
      (response) => {
        console.log(response.data);
        toast.success('User modified successfully');
        setEdit(false);
        setRunQuery(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error modifying user');
      },
    )
  }

  const eraseUser = async () => {
    await deleteUser(
      user._id,
      userInformation,
      (response) => {
        console.log(response.data);
        toast.success('User deleted successfully');
        setEdit(false);
        setRunQuery(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error deleting user');
      },
    )
  }

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
                  onClick={() => updateUser()}
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
              <button onClick={() => eraseUser()} className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'>
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