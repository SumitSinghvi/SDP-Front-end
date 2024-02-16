import React from 'react'
import { useRef, useState } from 'react';

export default function SearchPage() {
  const inputRef = useRef();
  const [displayData, setDisplayData] = useState();
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://35.200.144.243:3000/data/" +
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
          setDisplayData();
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
  console.log(displayData)
  return (
    <div className='py-[1rem] px-[2rem]'>
      <h1 className='font-bold text-[3rem] px-[2rem] pb-4'>Verify Product</h1>
      <div className='flex p-[2rem] bg-white border rounded-md gap-4'>
        <input ref={inputRef} type="text" className='p-2 border-2 border-black rounded-lg w-[24rem] text-black' placeholder='Enter Search ID'/>
        <div className='bg-black flex font-semibold rounded-lg px-4'>
        <button onClick={handleSearch}>Verify</button>
        </div>
      </div>
      {displayData && (
      <div className='bg-white text-black rounded-md my-[2rem] pb-[1rem]'>
        <h1 className='font-bold text-[1.5rem] p-[2rem]'>Product Information</h1>
          {Object.keys(displayData.combinedData).map((key, index) => (
              <div key={index} className="px-[2rem] pb-[0.5rem] font-semibold capitalize">
                <div className='flex gap-4'>
                <p className='pr-[2.5rem]'>{key}</p>
                <p>{displayData.combinedData[key]}</p>
                </div>
              </div>
          ))}
      </div>
      )}
      {err && (
        <div className='bg-white text-black rounded-md my-[2rem]'>
        <h1 className='font-bold text-[1.5rem] p-[2rem]'>Error Not Found</h1>
        </div>
      )
      }
    </div>
  )
}
