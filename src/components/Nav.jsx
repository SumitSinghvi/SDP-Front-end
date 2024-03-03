// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function Nav() {
//   return (
//     <div>
//       <nav className='bg-gradient-to-r from-[#eedfaf] to-[#c49d28] py-[1.5em] px-[150px] flex justify-between items-center'>
//                 <Link to='/'>
//                     <h2 className='text-[1.5rem] text-[#856e28]'>BRAND PROOF</h2>
//                 </Link>
//                 <div className='flex gap-4'>
//                     <h3>About us</h3>
//                     <h3 className='border-l border-black'></h3>
//                     <h3>How it works</h3>
//                     <h3 className='border-l border-black'></h3>
//                     <Link to='/login'>
//                         <h3>Client Login</h3>
//                     </Link>
//                 </div>
//                 <div className='flex gap-4'>
//                     <a href='#contact'><h3>Contact us</h3></a>
//                 </div>
//         </nav>
//     </div>
//   )
// }

import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <nav className='bg-gradient-to-r from-[#eedfaf] to-[#c49d28] py-[1.5em] px-[1.5rem] sm:px-[150px] flex flex-col sm:flex-row justify-between items-center'>
        <Link to='/'>
          <h2 className='text-[1.5rem] text-[#856e28]'>BRAND PROOF</h2>
        </Link>
        <div className='flex gap-4 mt-4 sm:mt-0'>
          <h3>About us</h3>
          <h3 className='border-l border-black pl-4'></h3>
          <h3>How it works</h3>
          <h3 className='border-l border-black pl-4'></h3>
          <Link to='/login'>
            <h3>Client Login</h3>
          </Link>
        </div>
        <div className='flex gap-4 mt-4 sm:mt-0'>
          <a href='#contact'><h3>Contact us</h3></a>
        </div>
      </nav>
    </div>
  )
}
