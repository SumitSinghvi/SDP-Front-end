import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUser(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_BASEURL + '/login', { username: user, password });
            localStorage.setItem('username',response.data.username)
            navigate('/App');
            // You may add further logic here, such as redirecting the user upon successful login
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <>
            <div>
                <nav className='bg-gradient-to-r from-[#eedfaf] to-[#c49d28] py-[1.5em] px-[1.5rem] sm:px-[150px] flex justify-center'>
                    <Link to='/'>
                    <h2 className='text-[1.5rem] text-[#856e28]'>TagZooper</h2>
                    </Link>
                </nav>
            </div>
            <div className="flex items-center justify-center bg-gray-50 py-[4rem] px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="user-address" className="sr-only">Username</label>
                                <input
                                    id="user-address"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={user}
                                    onChange={handleUserChange}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#dec782] hover:bg-[#dbba57] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                        <div className='flex justify-end'>
                            <button className='text-white rounded-md p-1 text-sm bg-red-500'>change password</button>
                        </div>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
