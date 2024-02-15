import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='bg-violet-400 text-white p-4 h-screen flex justify-center items-center'>
      <Link to="/form" className='p-4 m-4 bg-violet-600 rounded-md text-black'>Generate UIDs</Link>
      <Link to="/search" className='p-4 m-4 bg-violet-600 rounded-md text-black'>Search UIDs</Link>
      <Link to="/category" className='p-4 m-4 bg-violet-600 rounded-md text-black'>Go to Categores</Link>
    </div>
  )
}