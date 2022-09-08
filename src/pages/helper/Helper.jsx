import React, {useState, useEffect} from 'react'
import Navbar from 'components/Navbar'
import { getCases, editCase } from 'utils/api'
import { nanoid } from 'nanoid'
import { BsPencil } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import { Tooltip, Dialog, Slide } from '@material-ui/core'
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
              <CaseCard key={nanoid()} cases={cases} setRunQuery={setRunQuery}/>
            )
          })} 
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={5000}/>  
  </div>
  )
}

const CaseCard = ({cases, setRunQuery}) => {

  const [openModal, setOpenModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [caseInformation, setCaseInformation] = useState({
    _id: cases._id,
    name: cases.name,
    lastname: cases.lastname,
    idcard: cases.idcard,
    sex: cases.sex,
    birth: cases.birth,
    residence: cases.residence,
    job: cases.job,
    test_result: cases.test_result,
    test_date: cases.test_date,
    states: {
      state: cases.state,
      update_date: cases.update_date,
    },
  })
  const isEditing = () => {
    setOpenModal((c) => !c)
    setEdit(!edit)
  } 

  return (
    <div className='p-4 sm:w-1/2 lg:w-1/3 hover:scale-105'>
      <div className='h-full border border-gray-200 rounded-lg overflow-hidden'>
        <div className='flex flex-row justify-between'>
          <p className='text-lg font-semibold text-gray-800 pl-4 pt-2 select-none'> 
            {cases.name + " " + cases.lastname} 
          </p>
          <Tooltip title='Edit Case' arrow>
            <div>
              <BsPencil size={35} onClick={() => isEditing()} className='pr-4 pt-1 text-blue-700 hover:text-blue-500 cursor-pointer'/> 
            </div>
          </Tooltip>
        </div>
        <p className='px-4 select-none text-gray-700 font-medium'>
          {cases.test_result + " " + cases.test_date }
        </p>
        <p className='px-4 select-none text-gray-700 font-medium'>
          {"ID Card: " + cases.idcard}
        </p>
        {/* <p className='px-4 select-none'>
          {"Residence address: " + cases.residence}
        </p>
        <p className='px-4 select-none'>
          {"Job address: " + cases.job}
        </p> */}
        <p className='px-4 pb-3 select-none text-gray-700 font-medium'> 
          {" Date of birth: " + cases.birth + " Sex: " + cases.sex}
        </p>
      </div>
      <Modal openModal={openModal} setOpenModal={setOpenModal} setRunQuery={setRunQuery} cases={cases} caseInformation={caseInformation} setCaseInformation={setCaseInformation} edit={edit} setEdit={setEdit}/>
    </div>
  )
}

const Modal = ({openModal, setOpenModal, setRunQuery, cases, caseInformation, setCaseInformation, edit, setEdit}) => {

  const updateCase = async () =>{
    await editCase(
      cases._id,
      {
        name: caseInformation.name,
        lastname: caseInformation.lastname,
        idcard: caseInformation.idcard,
        sex: caseInformation.sex,
        birth: caseInformation.birth,
        residence: caseInformation.residence,
        job: caseInformation.job,
        test_result: caseInformation.test_result,
        test_date: caseInformation.test_date,
        states: {
          state: caseInformation.state,
          update_date: caseInformation.update_date,
        },
      },
      (response) => {
        console.log(response.data);
        toast.success('Case modified successfully');
        setOpenModal(false);
        setEdit(false);
        setRunQuery(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error modifying case');
      },
    )
  }
  
  return(
    <Dialog fullScreen open={openModal} TransitionComponent={Transition}>
      <div className='shadow-md w-full fixed top-0 left-0'>
        <div className='flex items-center justify-between bg-indigo-500 py-4 md:px-4 px-4'>
          <div className='font-bold text-white flex items-center'>
            <button onClick={() => setOpenModal(false)}>
              <IoCloseOutline  className='w-10 h-10 p-1 hover:bg-indigo-600 rounded-lg'/>
            </button>
            <span className='text-3xl font-normal mx-5 select-none'> Edit case </span>
          </div>
          <button onClick={() => updateCase()} className='bg-white text-indigo-500 py-2 px-6 mr-7 rounded hover:rounded-full md:ml-8 select-none'>
            Update
          </button>
        </div>
      </div>
      <div className='pt-24 pb-5 px-10'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full h-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor="name">
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
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='lastname'>
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
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full h-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor="idcard">
              ID Card
            </label>
            <input 
              type="text"
              value={caseInformation.idcard} 
              onChange={e => setCaseInformation({...caseInformation, idcard:e.target.value})}
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='sex'>
              Sex
            </label>
            <div>
              <select
                name="sex"
                value={caseInformation.sex} 
                onChange={e => setCaseInformation({...caseInformation, sex:e.target.value})} 
                className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              >
                <option disabled>Select the sex</option>
                <option>Men</option>
                <option>Woman</option>
              </select>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='birth'> 
              Date of birth
            </label>
            <input 
              type="date"
              value={caseInformation.birth} 
              onChange={e => setCaseInformation({...caseInformation, birth:e.target.value})}
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='residence'> 
              Residence address
            </label>
            <input 
              type="text"
              value={caseInformation.residence} 
              onChange={e => setCaseInformation({...caseInformation, residence:e.target.value})}
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>          
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full h-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor="job">
              Job Address
            </label>
            <input 
              type="text"
              value={caseInformation.job} 
              onChange={e => setCaseInformation({...caseInformation, job:e.target.value})}  
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='test_result'>
              Test result
            </label>
            <div>
              <select 
                name="test_result"
                value={caseInformation.test_result} 
                onChange={e => setCaseInformation({...caseInformation, test_result:e.target.value})} 
                className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              >
                <option disabled >Select the result</option>
                <option>Positive</option>
                <option>Negative</option>
              </select>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full h-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor="test_date">
              Test date
            </label>
            <input 
              type="date"
              value={caseInformation.test_date} 
              onChange={e => setCaseInformation({...caseInformation, test_date:e.target.value})} 
              className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-gray-700 font-semibold text-lg mb-2 select-none' htmlFor='state'>
              Case state
            </label>
            <div>
              <select 
                name="state"
                value={caseInformation.state} 
                onChange={e => setCaseInformation({...caseInformation, state:e.target.value})} 
                className='w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              >
                <option disabled>Select the state</option>
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
      </div>
    </Dialog>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Helper