import React, { useEffect, useState } from 'react'
import Navbar from 'components/Navbar'
import { getCases } from 'utils/api'
import { nanoid } from 'nanoid'

const Helper = () => {

  const Menus = [
    { title: "Helper", route: '/helper' },
    { title: "Register Case", route: '/helper/registercase' },
  ]

  const [cases, setCases] = useState([])
  const [runQuery, setRunQuery] = useState(false)
  const [search, setSearch] = useState('')
  const [filterC, setFilterC] = useState(cases)

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
                <p className='text-lg font-semibold text-gray-900 px-4 pt-2 select-none'> 
                  {cases.name + " " + cases.lastname} 
                </p>
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
  )
}

export default Helper