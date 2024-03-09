// import React from 'react'
// import { FaXTwitter } from "react-icons/fa6";
// import { FaLinkedin } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <div>
//       <footer className='bg-black text-white py-[4rem]'>
//         <div className='flex justify-center'>
//             <h1 className='text-[2rem]'>Get in touch</h1>
//         </div>
//         <div className='flex py-[2rem] justify-around'>
//             <div className='flex flex-col gap-2'>
//                 <div className='flex items-center gap-2'>
//                     <MdEmail />
//                     <p>Email : sumitjaindev@gmail.com</p>
//                 </div>
//                 <div className='flex items-center gap-2'>
//                     <FaPhoneAlt />
//                     <p>Phone : 91+ 8639910526</p>
//                 </div>
//             </div>
//             <div className='flex flex-col'>
//                 <div className='flex items-center gap-2'>
//                     <p>Twitter</p>
//                     <FaXTwitter />
//                 </div>
//                 <div className='flex items-center gap-2'>
//                     <p>LinkedIn</p>
//                     <FaLinkedin />
//                 </div>
//             </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

import React from 'react';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-start">
          <h1 className="text-2xl font-bold mb-4">Get in touch</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className='mb-4'>
            <div className="flex items-center mb-4">
              <MdEmail className="text-white mr-2" />
              <p className="text-white">Email: sumitjaindev@gmail.com</p>
            </div>
            <div className="flex items-center">
              <MdPhone className="text-white mr-2" />
              <p className="text-white">Phone: +91 8639910526</p>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4 gap-2">
              <FaTwitter className="text-white" />
              <p className="text-white mr-2">Twitter: SumitJainDev</p>
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-white" />
              <p className="text-white mr-2">LinkedIn: SumitSinghvi</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
