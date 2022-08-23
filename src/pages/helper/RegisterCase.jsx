import React, { useEffect, useRef, useState } from 'react'
import Navbar from 'components/Navbar'
import { createCase, getCases } from 'utils/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RegisterCase = () => {

  const Menus = [
    { title: "Helper", route: '/helper' },
    { title: "Register Case", route: '/helper/registercase' },
  ]

  const [cases, setCases] = useState([])
  const [runQuery, setRunQuery] = useState(false)

  useEffect(() => {
    const fetchCases = async () => {
      await getCases(
        (response) => {
          console.log('users', response.data);
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

  const form = useRef(null)

  const submitForm = async (e) => {
    e.preventDefault()
    const fd = new FormData(form.current)

    const newCase = {}
    fd.forEach((value, key) => {
      newCase[key] = value
    })

    await createCase(
      {
        name: newCase.name,
        lastname: newCase.lastname,
        idcard: newCase.idcard,
        sex: newCase.sex,
        birth: newCase.birth,
        residence: newCase.residence,
        job: newCase.job,
        test_result: newCase.test_result,
        test_date: newCase.test_date,
        state: newCase.state,
        caseid : cases.length + 1,
      },
      (response) => {
        console.log(response.data);
        toast.success('Case created successfully')
        e.target.reset();
      },(error) => {
        console.error(error);
        toast.error('Error creating a case');
      }
    )
  }

  return (
    <div>
      <Navbar menus={Menus}/>
      <div className='flex flex-col items-start pt-20 px-10'>
        <p className='text-2xl font-semibold select-none'> Register new case </p>
        <form ref={form} onSubmit={submitForm} className='w-full mt-5 mb-5'>
          <div className='flex flex-wrap -mx-3 mb-4'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='name'>Name</label>
              <input type="text" name='name' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='lastname'>Lastname</label>
              <input type="text" name='lastname' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-4'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='idcard'>ID Card</label>
              <input type="number" name='idcard' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='sex'>Sex</label>
              <div className='mt-1'>
                <select name="sex" required defaultValue={0} className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'>
                  <option disabled value={0}>Select the sex</option>
                  <option>Men</option>
                  <option>Woman</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-4'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='birth'>Date of birth</label>
              <input type="date" name='birth' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='residence'>Residence address</label>
              <input type="text" name='residence' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-4'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='job'>Job address</label>
              <input type="text" name='job' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='test_result'>Test result</label>
              <div className='mt-1'>
                <select name="test_result" required defaultValue={0} className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'>
                  <option disabled value={0}>Select the result</option>
                  <option>Positive</option>
                  <option>Negative</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='test_date'>Exam date</label>
              <input type="date" name='test_date' required className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'/>
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label className='text-gray-700 font-semibold mb-2 select-none' htmlFor='state'>Case state</label>
              <div className='mt-1'>
                <select name="state" required defaultValue={0} className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'>
                  <option disabled value={0}>Select the state</option>
                  <option>Does not apply</option>
                  <option>Home treatment</option>
                  <option>Hospital treatment</option>
                  <option>ICU</option>
                  <option>Cured</option>
                  <option>Dead</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3'>
            <div className='w-full md:w-1/2 px-3 mb-3 md:mb-0'>
              <button type='submit'className='bg-indigo-500 text-white w-full mt-4 px-4 py-2 rounded hover:rounded-full select-none'>
                Save Case
              </button>
            </div>
          </div>
          <ToastContainer position="bottom-center" autoClose={5000}/>
        </form>
      </div>
    </div>
  )
}

export default RegisterCase