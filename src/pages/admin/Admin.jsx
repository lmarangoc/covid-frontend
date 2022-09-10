import React, { useState, useEffect, useRef } from 'react'
import Navbar from 'components/Navbar'
import { nanoid } from 'nanoid'
import { BsPencil } from 'react-icons/bs'
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5'
import { Dialog, Tooltip } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUsers, editUser, deleteUser, createUser } from 'utils/api'

const Admin = () => {

  const [users, setUsers] = useState([])
  const [runQuery, setRunQuery] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers(
        (response) => {
          console.log('users', response.data);
          setUsers(response.data)
          setRunQuery(false)
        },
        (error) => {
          console.log(error)
        }
      )
    }
    if (runQuery) {
      fetchUsers()
      setRunQuery(true)
    }
  }, [runQuery])

  useEffect(() => {
    setRunQuery(true)
  }, [])

  const Menus = [
    { title: "Administration", route: '/admin' },
  ]

  return (
    <div>
      <Navbar menus={Menus}/>
      <UsersTable usersList={users} setAddAUser={setUsers} setRunQuery={setRunQuery}/>
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  )
}

const UsersTable = ({loading, usersList, setAddAUser, setRunQuery}) => {

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
    <div className='px-12 pt-28'>
      <div className='flex flex-row items-center justify-evenly'>
        <input 
          placeholder="Search" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className='rounded border border-gray-400 py-2 px-3 w-4/12 focus:outline-indigo-500'
        />
        <button 
          onClick={() => setOpenModal((c) => !c)}
          type='submit'
          className='bg-indigo-500 text-white px-4 py-2 rounded hover:rounded-full select-none'
        >
          Add User
        </button>
      </div>
      <div className='flex flex-wrap px-8 py-5'>
        {filterU.map((user) => {
          return (
            <UserCard key={nanoid()} user={user} setRunQuery={setRunQuery}/>
          )
        })}
      </div>
      <Modal stt={openModal} changeState={setOpenModal} setRunQuery={setRunQuery}/>
    </div>
  )
}

const UserCard = ({ user, setRunQuery }) => {

  const [openModal, setOpenModal] = useState(false)
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

  const isEditing = () => {
    setOpenModal((c) => !c)
    setEdit(!edit)
  }

  const eraseUser = async () => {
    await deleteUser(
      user._id,
      (response) => {
        console.log(response.data);
        toast.success('User deleted successfully');
        setRunQuery(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error deleting user');
      },
    )
    setOpenDialog(false)
  }

  return (
    <div className='p-4 sm:w-1/2 lg:w-1/3 hover:scale-105'>
      <div className='h-full border border-gray-200 rounded-lg overflow-hidden'>
        <div className='flex flex-row justify-between'> 
          <p className='text-lg font-medium text-gray-800 pl-4 pt-2 select-none'>
            {user.name + " " + user.lastname}
          </p>
          <div className='flex flex-row mr-4'>
            <Tooltip title='Edit Case' arrow>
              <div>
                <BsPencil size={25} onClick={() => isEditing()} className='mr-4 mt-2 text-green-700 hover:text-green-500 cursor-pointer'/>
              </div>
            </Tooltip>
            <Tooltip title='Delete user' arrow>
              <div>
                <IoTrashOutline size={25} onClick={() => setOpenDialog(true)} className='mt-2 text-red-700 hover:text-red-500 cursor-pointer'/>
              </div>
            </Tooltip>
          </div>
        </div>
        <p className='text-lg font-normal text-gray-800 px-4 select-none'>
          {user.role + ' ' + user.idcard}
        </p>
        <p className='text-lg font-normal text-gray-800 px-4 select-none'>
          {user.user + ' ' + user.password}
        </p>
      </div>
      <Dialog open={openDialog}>
        <div className='px-8 pt-4 pb-2 flex flex-col'>
          <h1 className='text-gray-900 text-2xl font-medium'>
            Are you sure, you want to remove the user?
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
      <EditModal openModal={openModal} setOpenModal={setOpenModal} setRunQuery={setRunQuery} user={user} userInformation={userInformation} setUserInformation={setUserInformation} edit={edit} setEdit={setEdit}/>
    </div>
  )
}

const EditModal = ({openModal, setOpenModal, setRunQuery, user, userInformation, setUserInformation, edit, setEdit}) => {

  const updateUser = async () =>{
    await editUser(
      user._id,
      userInformation,
      (response) => {
        console.log(response.data);
        toast.success('User modified successfully');
        setOpenModal(false);
        setEdit(false);
        setRunQuery(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error modifying user');
      },
    )
  }

  return (
    <Dialog open={openModal}>
      <div className='flex justify-between items-start p-3 border-b text-white bg-indigo-500'>
        <h1 className='text-3xl font-normal ml-4 select-none'> Edit user </h1>
        <button onClick={() => setOpenModal(false)}>
          <IoCloseOutline  className='w-10 h-10 p-1 hover:bg-indigo-600 rounded-lg'/>
        </button>
      </div>
      <div className='mt-3 mb-5 mx-7'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full h-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor="name">
              Name
            </label>
            <input 
              type="text"
              value={userInformation.name}
              onChange={e => setUserInformation({...userInformation, name:e.target.value})} 
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='lastname'>
              Lastname
            </label>
            <input 
              type="text"
              value={userInformation.lastname} 
              onChange={e => setUserInformation({...userInformation, lastname:e.target.value})}
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full h-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor="idcard">
              ID Card
            </label>
            <input 
              type="number"
              value={userInformation.idcard}
              onChange={e => setUserInformation({...userInformation, idcard:e.target.value})} 
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='role'>
              Role
            </label>
            <div>
              <select 
                name="role"
                value={userInformation.role} 
                onChange={e => setUserInformation({...userInformation, role:e.target.value})} 
                className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              >
                <option disabled>Select the state</option>
                <option>Doctor</option>
                <option>Helper</option>
              </select>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full h-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor="user">
              Username
            </label>
            <input 
              type="text"
              value={userInformation.user}
              onChange={e => setUserInformation({...userInformation, user:e.target.value})} 
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='password'>
              Password
            </label>
            <input 
              type="text"
              value={userInformation.password} 
              onChange={e => setUserInformation({...userInformation, password:e.target.value})}
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
        </div>
        <button onClick={() => updateUser()} className='bg-indigo-500 text-white w-full mt-2 mb-2 px-4 py-2 rounded hover:rounded-full select-none'> 
          Update
        </button>
      </div>    
    </Dialog> 
  )
}

const Modal = ({ stt, changeState, setRunQuery }) => {

  const form = useRef(null)

  const submitForm = async (e) => {
    e.preventDefault()
    const fd = new FormData(form.current)

    const newUser = {}
    fd.forEach((value, key) => {
      newUser[key] = value
    })

    await createUser(
      {
        name: newUser.name,
        lastname: newUser.lastname,
        idcard: newUser.idcard,
        role: newUser.role,
        user: newUser.user,
        password: newUser.password,
      },
      (response) => {
        console.log(response.data);
        toast.success('User created successfully');
        setRunQuery(true);
      },(error) => {
        console.error(error);
        toast.error('Error creating a user');
      }
    )
    changeState(false)
  }

  return (
    <div>
      <Dialog open={stt}>
        <div className='w-96 h-full'>
          <div className='flex justify-between items-start p-3 border-b'>
            <h1 className='text-3xl font-base select-none'> Register new user </h1>
            <button onClick={() => changeState(false)}>
              <IoCloseOutline  className='w-10 h-10 p-1 hover:bg-gray-200 rounded-lg'/>
            </button>
          </div>
          <form ref={form} onSubmit={submitForm}>
            <div className='pl-6 pr-6 pb-6 pt-3'>
              <div className='border-b border-gray-400 pb-2 mb-3'>
                <input type="text" className='bg-transparent border-none w-full text-gray-900 mr-3 border-transparent focus:border-transparent focus:ring-0' placeholder="Name" name="name" required />
              </div>
              <div className='border-b border-gray-400 py-2 mb-3'>
                <input type="text" className='bg-transparent border-none w-full text-gray-900 mr-3 border-transparent focus:border-transparent focus:ring-0' placeholder="Lastname" name="lastname" required />
              </div>
              <div className='border-b border-gray-400 py-2 mb-3'>
                <input type="text" className='bg-transparent border-none w-full text-gray-900 mr-3 border-transparent focus:border-transparent focus:ring-0' placeholder="ID Card" name="idcard" required />
              </div>
              <div className='border-b border-gray-400 py-2 mb-3'>
                <select className='w-full border-transparent focus:border-transparent focus:ring-0 text-gray-900 mr-3' name="role" required defaultValue={0}>
                  <option disabled value={0}> Select a role </option>
                  <option> Doctor </option>
                  <option> Helper </option>
                </select>
              </div>
              <div className='border-b border-gray-400 py-2 mb-3'>
                <input type="text" className='bg-transparent border-none w-full text-gray-900 mr-3 border-transparent focus:border-transparent focus:ring-0' placeholder="Username" name="user" required />
              </div>
              <div className='border-b border-gray-400 py-2 mb-5'>
                <input type="password" className='bg-transparent border-none w-full text-gray-900 mr-3 border-transparent focus:border-transparent focus:ring-0' placeholder="Password" name="password" required />
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