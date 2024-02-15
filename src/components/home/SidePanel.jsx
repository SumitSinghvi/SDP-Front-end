import React, { useEffect } from 'react';
import { SlHome } from "react-icons/sl";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";


const SidePanel = ({currentPage, setCurrentPage}) => {
    useEffect(()=>{
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.backgroundColor = 'transparent';
            button.style.color = '#D1D5DB';
        });
        if(currentPage){
            const element = document.getElementById(currentPage);
            element.style.backgroundColor = '#808080';
            element.style.color = 'white';
        }
    },[currentPage]);

  return (
    <div>
    <div className="absolute top-[4rem] inset-0 border-r left-0 w-[16rem] text-white">
    <div className='flex flex-col p-6'>
      <button onClick={()=>setCurrentPage('Home')} id='Home' className="text-gray-200 px-2 flex gap-2 items-center hover:text-white text-xl py-2 text-left font-semibold rounded-md">
        <span><SlHome /></span>
        Home</button>
      <button onClick={()=>setCurrentPage('Search')} id='Search' className="px-2 flex gap-2 items-center text-gray-200 hover:text-white text-xl py-2 text-left font-semibold rounded-md">
      <span><IoMdCheckmarkCircleOutline /></span>
      Verify Product</button>
      <button onClick={()=>setCurrentPage('Activity')} id='Activity' className="px-2 flex gap-2 items-center text-gray-200 hover:text-white text-xl py-2 text-left font-semibold rounded-md">
      <span><FiActivity /></span>
      Activity</button>
      <button onClick={()=>setCurrentPage('Settings')} id='Settings' className="px-2 flex gap-2 items-center text-gray-200 hover:text-white text-xl py-2 text-left font-semibold rounded-md">
      <span><IoSettingsSharp /></span>
        Settings</button>
    </div>
    </div>
    </div>
  );
};

export default SidePanel;
