import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({category, setCategory}) {
    const handleAdd = () => {
    setCategory([...category, 'Category' + category.length]);
    }

    const handleDelete = (index) => {
        const updatedCategory = [...category];
        updatedCategory.splice(index, 1);
        setCategory(updatedCategory);
    }
    return (
        <div className='bg-green-800 h-screen font-bold flex flex-col justify-center items-center gap-4'>
            <Link to="/"><button className='p-4 bg-yellow-400 rounded-md'>Go to Home</button></Link>
            {category.map((element,index) => (
                <div key={index} className=' bg-green-400 rounded-md'>
                    <Link to="/layout"><button className='p-4'>{element}</button></Link>
                    <button className='bg-yellow-400 m-3 rounded-md py-2 px-3' onClick={() => handleDelete(index)}>Delete Category</button>
                </div>
            ))}
            <button className='bg-yellow-400 py-2 px-3 rounded-md' onClick={() => handleAdd()}>Add Category</button>
        </div>
    )
}
