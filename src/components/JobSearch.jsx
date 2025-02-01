import React from 'react'
import { CiSearch } from "react-icons/ci";

function JobSearch() {
  return (
    <div className='flex justify-center items-center h-20 bg-gray-200 dark:bg-gray-800'>
        <div className='flex items-center    p-2 rounded-lg shadow-md'>
          <CiSearch className='text-2xl' />
          <input type='search' placeholder='Job title or keyword' 
          className=' w-60 px-4 py-2  border border-gray-800  focus:outline-none focus:ring-2 focus:ring-blue-500'>
            
          </input>

        </div>

        <div className='flex items-center    p-2 rounded-lg shadow-md '>
            <select className=" w-60 px-4 py-2 border border-gray-800   focus:outline-none focus:ring-2 focus:ring-blue-500  ">
                <option>City or State</option>
                <option>Accra</option>
                <option>Kumasi</option>
            </select>

            <button className=" w-32 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Search
            </button>
        </div>
      
        
    </div>
  )
}

export default JobSearch;