import React, { useEffect, useState } from 'react'
import Navbar from 'components/Navbar'
import { getCases, editCase } from 'utils/api'
import { nanoid } from 'nanoid'
import { BsPencil } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import { Tooltip, Dialog } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Helper = () => {

  const Menus = [
    { title: "Helper", route: '/helper' },
    { title: "Register Case", route: '/helper/registercase' },
  ]

  const [cases, setCases] = useState([])
  const [runQuery, setRunQuery] = useState(false)
  const [search, setSearch] = useState('')
  const [filterC, setFilterC] = useState(cases)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const fetchCases = async () => {
      await getCases(
        (response) => {
          console.log('cases', response.data);
          setCases(response.data)
          setRunQuery(false)
        },
        (error) => {
          console.log(error)
        }
      )
    }
    if (runQuery) {
      fetchCases()
      setRunQuery(true)
    }
  }, [runQuery])

  useEffect(() => {
    setRunQuery(true)
  }, [])

  useEffect(() => {
    setFilterC(
      cases.filter((elemento) => 
        JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase()),
      )
    )
  }, [search, cases])

  return (
    <div className='w-full h-full'>
      <Navbar menus={Menus}/>
      <div>
        <div className='flex items-center justify-center pt-28'>
          <input 
            type="search" 
            placeholder="Search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='w-4/12 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          />
        </div>
        <div className='flex flex-wrap px-8 py-5'>
          {filterC.map((cases) => {
            return (
              <div key={nanoid()} className='p-4 sm:w-1/2 lg:w-1/3 hover:scale-105'>
                <div className='h-full border border-gray-200 rounded-lg overflow-hidden'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-lg font-semibold text-gray-900 pl-4 pt-2 select-none'> 
                    {cases.name + " " + cases.lastname} 
                    </p>
                    <Tooltip title='Edit Case' arrow>
                      <div>
                        <BsPencil size={35} onClick={() => setEdit((c) => !c)} className='pr-4 pt-1 text-blue-700 hover:text-blue-500 cursor-pointer'/> 
                      </div>
                    </Tooltip>
                  </div>
                  <p className='px-4 select-none'>
                    {cases.test_result + " " + cases.test_date }
                  </p>
                  <p className='px-4 select-none'>
                    {"ID Card: " + cases.idcard}
                  </p>
                  <p className='px-4 select-none'>
                    {"Residence address: " + cases.residence}
                  </p>
                  <p className='px-4 select-none'>
                    {"Job address: " + cases.job}
                  </p>
                  <p className='px-4 pb-3 select-none'> 
                    {" Date of birth: " + cases.birth + " Sex: " + cases.sex}
                  </p>
                </div>
              </div>
            )
          })} 
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={5000}/>
      <Modal edit={edit} setEdit={setEdit} cases={cases} setRunQuery={setRunQuery}/>
    </div>
  )
}

const Modal = ({edit, setEdit, cases, setRunQuery}) => {

  const [caseInformation, setCaseInformation] = useState({
    name: cases.name,
    lastname: cases.name,
    idcard: cases.idcard,
    sex: cases.sex,
    birth: cases.birth,
    residence: cases.residence,
    job: cases.job,
    test_result: cases.test_result,
    test_date: cases.test_date,
  })

  const updateCase = async () =>{
    await editCase(
      cases._id,
      caseInformation,
      (response) => {
        console.log(response.data);
        toast.success('Case modified successfully');
        setEdit(false);
        setRunQuery(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error modifying case');
      },
    )
  }

  return (
    <div>
      <Dialog open={edit}>
        <div className='w-full h-full'>
          <div className='flex justify-between items-start p-3 border-b'>
            <h1 className='text-3xl font-base select-none text-gray-800'> Edit case </h1>
            <button onClick={() => setEdit(false)}>
              <IoCloseOutline  className='w-10 h-10 p-1 text-gray-400 hover:bg-gray-200 rounded-lg'/>
            </button>
          </div>
          <div className='w-full p-6'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full h-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor="name">
                  Name
                </label>
                <input 
                  type="text" 
                  value={caseInformation.name} 
                  onChange={e => setCaseInformation({...caseInformation, name:e.target.value})} 
                  className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='lastname'>
                  Lastname
                </label>
                <input 
                  type="text" 
                  value={caseInformation.lastname} 
                  onChange={e => setCaseInformation({...caseInformation, lastname:e.target.value})} 
                  className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Helper