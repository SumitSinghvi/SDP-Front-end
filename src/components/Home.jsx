import React from 'react'
import NavBar from './home/NavBar';
import SidePanel from './home/SidePanel';
import { useState } from 'react';
import HomePage from '../Pages/HomePage';
import SearchPage from '../Pages/SearchPage';
import ActivityPage from '../Pages/ActivityPage';
import SettingPage from '../Pages/SettingPage';

export default function Home() {  
  const [currentPage, setCurrentPage] = useState('Home');
  const [homePageNav, setHomePageNav] = useState('Category')
    return (
      <div>
        <NavBar />
        <SidePanel currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {/* <div className='text-white p-4 h-screen flex justify-center items-center'>
          <Link to="/category" className='rounded-md font-bold p-4 m-4 bg-blue-400 text-black'>category</Link>
        </div> */}
        {currentPage == 'Home' && (
          <div className='absolute top-[4rem] left-[16rem] inset-0'>
              <HomePage homePageNav={homePageNav} setHomePageNav={setHomePageNav}/>
          </div>
        )}
        {currentPage == 'Settings' && (
          <div className='absolute top-[4rem] left-[16rem] inset-0'>
              <SettingPage/>
          </div>
        )}
        {currentPage == 'Search' && (
          <div className='absolute top-[4rem] left-[16rem] inset-0'>
              <SearchPage/>
          </div>
        )}
        {currentPage == 'Activity' && (
          <div className='absolute top-[4rem] left-[16rem] inset-0'>
              <ActivityPage/>
          </div>
        )}
      </div>
  )
}
