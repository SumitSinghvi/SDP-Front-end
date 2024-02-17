import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';

export default function Search() {
  const inputRef = useRef();
  const [displayData, setDisplayData] = useState();
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/data/" +
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
  
  return (
    <div className="from-black text-white to-red-900 bg-gradient-to-b w-screen h-screen flex flex-col gap-3 justify-center items-center">
        {displayData && (
          <div className="bg-red-900 p-3 text-white font-bold flex flex-col gap-3 items-center w-[30%] rounded-xl">
            {Object.keys(displayData).map((key, index) => (
              <p key={index} className="text-lg text-red-500">
                {key}: {displayData[key]}
              </p>
            ))}
          </div>
        )}
        {err && <div className="bg-red-900 p-3 text-white font-bold flex flex-col gap-3 items-center w-[30%] rounded-xl">
        <h1 className="text-xl text-red-200">Item Not Found</h1>
        </div>}
      <input
        required
        placeholder="Enter UIDs"
        className="bg-red-100 text-black outline-none p-2 rounded-xl w-[30%]"
        ref={inputRef}
      />
      <button
        type="submit"
        className="bg-red-400 transition-all ease-linear duration-300 hover:bg-red-300 px-6 py-2 w-[30%] rounded-xl"
        onClick={handleSearch}
      >
        SEARCH
      </button>
      <div className="w-[25%] rounded-xl h-1 bg-black"></div>
      <Link to="/layout" className="w-[30%]">
        <button className="bg-transparent text-white font-bold font-sans outline outline-1 outline-red-600 transition-all ease-linear duration-300 hover:text-red-400 px-6 py-2 rounded-xl w-full">
          Go Back
        </button>
      </Link>
    </div>
  );
}
