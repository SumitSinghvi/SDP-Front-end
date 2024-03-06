import React, { useState } from 'react';
import axios from 'axios'; 
import Nav from '../components/Nav';
import Footer from '../components/Footer'

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_BASEURL + '/register', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <Nav />
      <div className='flex flex-col justify-center items-center h-[400px]'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            />
        </div>
        <button className='bg-gray-200 px-4 py-2 rounded-md'  type="submit">Register</button>
      </form>
      </div>
      {message && <p>{message}</p>}
      <Footer />
    </div>
  );
}

export default RegisterPage;
