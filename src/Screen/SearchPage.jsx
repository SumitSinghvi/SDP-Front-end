import React from 'react'
import { useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";

export default function SearchPage() {
  const inputRef = useRef();
  const [displayData, setDisplayData] = useState({});
  const [err, setErr] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.VITE_BASEURL + "/data/" +
          inputRef.current.value,
        {
          // Update the URL
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if(!data) {
          setErr(true);
          setDisplayData({err:'Not Found'});
          return;
        }
        setDisplayData(data);
        console.log(data)
        setErr(false);
      } else {
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <div>
      <nav className='bg-white px-[8rem] border-b py-[0.5em] flex flex-col sm:flex-row justify-center items-center'>
        <div className='flex items-center gap-3'>
          <CiSearch className='text-3xl'/>
          <h1 className='text-[1.5rem]'>Product Verification</h1>
        </div>
      </nav>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-gray-200 py-[4rem] px-[8rem] rounded-lg'>
          <form onSubmit={handleSearch} className='flex flex-col gap-4'>
            <label htmlFor="UID">Please enter your UID</label>
            <input type="text" ref={inputRef} placeholder='UID' className='outline-none px-2'/>
            <button type='submit' className='bg-gray-300 rounded-sm w-1/2'>Submit</button>
          </form>
          {Object.keys(displayData).length != 0 && err == false && (
              <div className='flex flex-col justify-center mt-6'>
                <h1 className='text-green-500 font-bold font-sans'>Original</h1>
                <h1 className='text-blue-500 font-sans'>Title: {displayData.Data.title}</h1>
                <h1 className='text-blue-500 font-sans'>Description: {displayData.Data.description}</h1>
              </div>
          )}
          {console.log(displayData)}
          {displayData.err == 'Not Found' && (
            <div className='text-red-600 text-center mt-[2rem] font-bold'>Wrong ID</div>
          )}
        </div>
      </div>
    </div>
  )
}

