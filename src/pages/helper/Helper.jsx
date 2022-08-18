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
    <div>
      <Navbar menus={Menus}/>
      <div className='px-10 py-32 flex-1 h-screen'>
        <div className='flex flex-wrap mb-10'>
          <input 
            type="search" 
            placeholder="Search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='w-4/12 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          />
        </div>
        <div className='flex flex-wrap'>
          {filterC.map((cases) => {
            return (
              <div key={nanoid()} className='p-4 sm:w-1/2 lg:w-1/3'>
                <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
                  <img src="https://avatars.dicebear.com/api/bottts/:seed.svg" alt="" className='w-1/2'/>
                </div>
              </div>
            )
          })} 
        </div>
      </div>
    </div>
  )
}

export default Helper