import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { GoPerson } from "react-icons/go";
import axios from 'axios';
import ExcelJS from 'exceljs';

export default function AppPage() {
    const user = localStorage.getItem('username');
    const [userData, setUserdata] = useState([]);
    const [separateData, useSeparateData] = useState();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        quantity: 1,
        user : localStorage.getItem('username') || ''
    });
    const [active, setActive] = useState('Generate');
    const navigate = useNavigate();
    if(!user){
        location.href = '/'
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_BASEURL + '/data', formData);
            console.log(response.data); // Handle response accordingly
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleLogout = () => {
        localStorage.clear()
        navigate('/login');
    }

    // Initialize an empty object to store lists for separate dates
    const separateLists = {};
    
    const handleCreateSeperateData = (data) => {
    // Iterate through the array of objects
    data.forEach(obj => {
        // Extract the date and time till minute
        const key = obj.createdAt.substring(0, 16);

        // Check if the key exists, if not, create an empty array
        if (!separateLists[key]) {
            separateLists[key] = [];
        }

        // Push the object to the corresponding list
        separateLists[key].push(obj);
    });

    // Display the separate lists
    useSeparateData(separateLists);
    console.log("sep",separateLists)
    }

    const handleDownload = async (date) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
    
        // Define headers
        const headers = ['ID', 'Data']; // Assuming these are the headers
    
        // Add headers to the worksheet
        worksheet.addRow(headers);
    
        // Add data rows
        separateData[date].forEach(row => {
            worksheet.addRow([row.uid, row.Data]); // Add each row's data directly
        });
    
        // Create a blob from the workbook
        const buffer = await workbook.xlsx.writeBuffer();
    
        // Create a blob object
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        // Create a URL for the blob object
        const url = window.URL.createObjectURL(blob);
    
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx'; // Set the file name
        a.click();
    
        // Clean up resources
        window.URL.revokeObjectURL(url);
    };    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BASEURL + `/category/${user}`);
                if (response.status === 200) {
                    const data = await response.data;
                    setUserdata(data);
                    handleCreateSeperateData(data);
                    console.log('userdata', data);
                    return data;
                } else {
                console.error('Error fetching user data:', response.statusText);
                return null;
                }
              } catch (error) {
                console.error('Error fetching user data:', error);
              }
        };
    
        if (user) {
          fetchData();
        }
    }, [user]);

    return (
        <div className='bg-gray-100'>
        <nav className='bg-white px-[8rem] py-[0.5em] flex flex-col sm:flex-row justify-between items-center'>
            <h1 className='text-[1.5rem]'>TagZooper</h1>
            <div className='flex gap-2'>
                <GoPerson className='text-4xl'/>
                <div>
                    <p className='text-xs capitalize'>{user}</p>
                    <button onClick={handleLogout} className='text-xs text-green-600 border-b'>SIGN OUT</button>
                </div>
            </div>
        </nav>
        <section className='bg-white border-b-2 shadow-lg px-[8rem] py-[0.5em] flex flex-col sm:flex-row gap-[2rem]'>
            <h1 onClick={() => setActive('Generate')} className={`${active === 'Generate' ? 'border-gray-400 border-b-2' : ''} cursor-pointer`}>Generate UIDs</h1>
            <h1 onClick={() => setActive('Files')} className={`${active === 'Files' ? 'border-gray-400 border-b-2' : ''} cursor-pointer`}>Files</h1>
        </section>
        {active == 'Generate' && (
        <section className='bg-gray-100 flex justify-center items-center py-[2rem]'>
            <div className='w-1/2 bg-white px-[2rem] py-[3rem] space-y-4 rounded-md'>
                <h1 className='text-[1.5rem] font-semibold'>Create a file</h1>
                <div className='flex justify-between items-center'>
                    <p>New Product</p>
                    <button onClick={handleSubmit} className='rounded-full bg-black text-white text-[0.75rem] py-[0.5rem] px-[1rem]'>Save</button>
                </div>
                <form className='space-y-6'>
                    <div className='flex justify-between'>
                        <label>Title</label>
                        <input
                        required
                        type="text"
                        className='border outline-none'
                        name="title"
                        onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <label>Description</label>
                        <textarea 
                        required 
                        className='border outline-none h-32 resize-none'
                        name="description" 
                        onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className='flex justify-between'>
                        <label>Quantity</label>
                        <input 
                        required 
                        type="number" 
                        className='border outline-none ' 
                        name="quantity" 
                        onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </section>
        )}
        {active == 'Files' && (
        <section className='flex justify-center py-[2rem]'>
            <div className='w-1/2 bg-white px-[2rem] py-[3rem] space-y-4 rounded-md'>
                <h1 className='text-[1.5rem] font-semibold'>Files</h1>
                <div className='flex justify-between items-center'>
                    <p>Products</p>
                    <button onClick={() => setActive('Generate')} className='rounded-full bg-black text-white text-[0.75rem] py-[0.5rem] px-[1rem]'>New Product</button>
                </div>
                {userData.length == 0 && <div className='flex flex-col justify-center items-center py-[1rem]'>
                    <h1 className='text-gray-600'>empty</h1>
                </div>}
                {userData.length != 0 && (
                    <div>
                        {/* <div className='flex justify-around'>
                            <p>Title</p>
                            <p>Description</p>
                        </div> */}
                        {Object.keys(separateData).map((key) => (
                            <div key={key}>
                                <div className='flex flex-col w-[3/4]'>
                                    <h1>Title: <span className='text-gray-500'>{separateData[key][0].Data.title}</span></h1>
                                    <h1>Description: <span className='text-gray-500'>{separateData[key][0].Data.description}</span></h1>
                                    <h1>Date: <span className='text-gray-500'>{key.substring(0,10)}, {key.substring(11,18)}</span></h1>
                                </div>
                                <button className='bg-green-600 rounded-sm my-4 px-[1.5rem] py-[0.25rem]' onClick={() => handleDownload(key)}>Download Excel</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
        )}
        </div>
    )
}
