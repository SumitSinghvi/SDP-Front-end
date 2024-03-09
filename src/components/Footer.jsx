import React from 'react';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-start">
          <h1 className="text-2xl font-bold mb-4">Get in touch</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className='mb-8'>
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <p className="text-white text-lg">Email: 
                <span className="text-gray-300"> patelman0706@gmail.com, sumitjaindev@gmail.com</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center">
              <p className="text-white text-lg">Phone: 
                <span className="text-gray-300"> +91 9429439075, +91 8639910526</span>
              </p>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className="flex items-center mb-4 gap-2">
              <FaTwitter className="text-white" />
              <p className="text-white mr-2">Twitter :</p>
              <div className='flex gap-2 -ml-1 text-gray-300'>
                <a href="https://twitter.com/SumitJainDev" target='_blank'>Sumit Singhvi,</a>
                <a href="https://twitter.com/PatelMa83735248?t=u-Qqdql_fsZgjK3iXo1D0w&s=08" target='_blank'>Man Patel,</a>
                <a href="#">Krishna Nagpure</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-white" />
              <p className="text-white mr-2">LinkedIn :</p>
              <div className='flex gap-2 -ml-1 text-gray-300'>
                <a href="https://www.linkedin.com/in/sumit-singhvi-3546a6193/" target='_blank'>Sumit Singhvi,</a>
                <a href="https://www.linkedin.com/in/patel-man-390b4126a/" target='_blank'>Man Patel,</a>
                <a href="#" target='_blank'>Krishna Nagpure</a>
              </div>
            </div>
          </div>
          <div className='md:hidden flex gap-2'>
            <a href="https://www.linkedin.com/in/patel-man-390b4126a/">
              <FaTwitter className="text-white" />
            </a>
            <a href="https://www.linkedin.com/in/patel-man-390b4126a/">
              <FaLinkedin className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
