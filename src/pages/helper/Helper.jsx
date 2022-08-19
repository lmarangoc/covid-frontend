import React, { useEffect, useState } from 'react'
import Navbar from 'components/Navbar'
import { getCases, editCase } from 'utils/api'
import { nanoid } from 'nanoid'
import { BsPencil } from 'react-icons/bs'
import { Tooltip } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Helper = () => {

  const Menus = [
    { title: "Helper", route: '/helper' },
    { title: "Register Case", route: '/helper/registercase' },
  ]

  const [showCard, setShowCard] = useState(true)
  const [cases, setCases] = useState([])
  const [runQuery, setRunQuery] = useState(false)

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
    }
  }, [runQuery])

  useEffect(() => {
    if (showCard) {
      setRunQuery(true)
    }
  }, [showCard])

  return (
    <div className='w-full h-full'>
      <Navbar menus={Menus}/>
      {showCard ? (<Card cases={cases} showCard={showCard} setShowCard={setShowCard}/>) : (<EditCase cases={cases} setRunQuery={setRunQuery}/>)}
      <ToastContainer position="bottom-center" autoClose={5000}
/>
    </div>
  )
}

const Card = ({cases, showCard, setShowCard}) => {

  const [search, setSearch] = useState('')
  const [filterC, setFilterC] = useState(cases)
  const [edit, setEdit] = useState(false)
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

  useEffect(() => {
    setFilterC(
      cases.filter((elemento) => 
        JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase()),
      )
    )
  }, [search, cases])

  return (
    <>
    {edit ? (
      <div className='flex flex-col items-start pt-24 px-10 pb-3 flex-1 h-screen'>
        <p className='text-2xl font-semibold select-none'> Register new case </p>
      </div>
    ) : (
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
                        <BsPencil size={35} onClick={() => setEdit(!edit)} className='pr-4 pt-1 text-blue-700 hover:text-blue-500 cursor-pointer'/> 
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
    )}
    </>
  )  
}

const EditCase = ({cases, setRunQuery}) => {

  const [edit, setEdit] = useState(false)
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

  const updateUser = async () =>{
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
      <div className='flex items-center justify-center pt-28'>
        Hola
      </div>
    </div>
  )
}

export default Helper