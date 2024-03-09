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
    const [active, setActive] = useState('Files');
    const navigate = useNavigate();
    if(!user){
        location.href = '/'
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_BASEURL + '/data', formData);
            console.log(response.data); // Handle response accordingly
            location.reload();
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
    
    const handleCreateSeperateData = (data) => {
        const separateLists = {};
        console.log("data",data)
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
        <nav className="bg-white px-8 sm:px-16 py-2 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">TagZooper</h1>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <GoPerson className="text-4xl"/>
                <div>
                    <p className="text-sm sm:text-xs capitalize">{user}</p>
                    <button onClick={handleLogout} className="text-sm text-green-600 border-b border-transparent hover:border-green-600 transition duration-300 ease-in-out focus:outline-none focus:border-green-600">SIGN OUT</button>
                </div>
            </div>
        </nav>
        <section className="bg-white border-b-2 shadow-lg px-8 sm:px-16 py-2 flex flex-col sm:flex-row gap-8">
            <h1 onClick={() => setActive('Generate')} className={`text-lg sm:text-xl cursor-pointer ${active === 'Generate' ? 'border-b-2 border-gray-400' : ''}`}>Generate UIDs</h1>
            <h1 onClick={() => setActive('Files')} className={`text-lg sm:text-xl cursor-pointer ${active === 'Files' ? 'border-b-2 border-gray-400' : ''}`}>Files</h1>
        </section>

        {active == 'Generate' && (
        <section className="bg-gray-100 flex justify-center items-center py-8">
            <div className="w-full md:w-1/2 bg-white px-8 py-6 space-y-4 rounded-md">
                <h1 className="text-xl md:text-2xl font-semibold">Create a file</h1>
                <div className="flex flex-row justify-between items-center">
                <p>New Product</p>
                <button onClick={handleSubmit} className="md:ml-2 rounded-full bg-black text-white text-xs md:text-sm py-2 px-4">
                    Save
                </button>
                </div>
                <form className="space-y-6">
                <div className="flex md:flex-row flex-col justify-between gap-2">
                    <label>Title</label>
                    <input
                    required
                    type="text"
                    className="border outline-none px-2 md:py-2 w-full md:w-2/3"
                    name="title"
                    onChange={handleChange}
                    />
                </div>
                <div className="flex md:flex-row flex-col justify-between gap-2">
                    <label>Description</label>
                    <textarea
                    required
                    className="border outline-none h-32 resize-none px-2 md:py-2 w-full md:w-2/3"
                    name="description"
                    onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex md:flex-row flex-col justify-between gap-2">
                    <label>Quantity</label>
                    <input
                    required
                    max='10'
                    type="number"
                    className="border outline-none px-2 md:py-2 w-full md:w-2/3"
                    name="quantity"
                    onChange={handleChange}
                    />
                </div>
                </form>
            </div>
            </section>
        )}
        {active == 'Files' && (
        <section className='flex justify-center py-8'>
            <div className='w-full md:w-3/4 lg:w-1/2 xl:w-2/3 bg-white px-4 md:px-8 py-6 md:py-12 space-y-4 rounded-md'>
                <h1 className='text-2xl font-semibold text-center'>Files</h1>
                <div className='flex flex-row justify-between items-center'>
                    <p className='text-center md:text-left'>Products</p>
                    <button onClick={() => setActive('Generate')} className='bg-black text-white text-sm py-2 px-4 rounded-full mt-4 md:mt-0'>New Product</button>
                </div>
                {userData.length === 0 ? (
                    <div className='flex flex-col justify-center items-center py-4'>
                        <h1 className='text-gray-600'>Empty</h1>
                    </div>
                ) : (
                    <div>
                        {Object.keys(separateData).map((key) => (
                            <div key={key} className='border-b border-gray-300 pb-4'>
                                <div className='flex flex-col'>
                                    <h1 className='text-lg font-semibold'>Title: <span className='text-gray-500'>{separateData[key][0].Data.title}</span></h1>
                                    <h1 className='text-lg font-semibold'>Description: <span className='text-gray-500'>{separateData[key][0].Data.description}</span></h1>
                                    <h1 className='text-lg font-semibold'>Date: <span className='text-gray-500'>{key.substring(0,10)}, {key.substring(11,18)}</span></h1>
                                </div>
                                <button className='bg-green-600 text-white text-sm py-1 px-4 rounded-md mt-4' onClick={() => handleDownload(key)}>Download Excel</button>
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
