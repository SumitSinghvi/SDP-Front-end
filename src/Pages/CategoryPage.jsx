import React, {useRef} from "react";
import { MdOutlineArrowForwardIos, MdDelete } from "react-icons/md";


export default function CategoryPage({
  category,
  setHomePageNav,
  setCategory,
}) {

    const categoryRef = useRef();
    const handleRemove = (index) => {
        const updatedCategory = [...category];

        updatedCategory.splice(index, 1);

        setCategory(updatedCategory);
    };

    const handleAdd = () => {
        setCategory([...category, categoryRef.current.value]);
    };

  return (
    <div>
      <h1 className="text-[3rem] font-semibold pb-8">Your Categories</h1>
      <div className="grid grid-cols-2 gap-4">
        {category.map((element, index) => (
          <div
            key={index}
            className="cursor-pointer uppercase font-bold bg-white text-black w-[20rem] flex text-left p-[1rem] rounded-md"
          >
            <div className="flex flex-col gap-2">
              {element}
              <div>
                <span onClick={()=>handleRemove(index)}>
                  <MdDelete />
                </span>
              </div>
            </div>
            <span
              className="ml-auto flex items-center"
              onClick={() => setHomePageNav(element)}
            >
              <MdOutlineArrowForwardIos />
            </span>
          </div>
        ))}
      </div>

      <div className='flex p-[2rem] bg-white border rounded-md gap-4 mt-[2rem]'>
        <input ref={categoryRef} type="text" className='p-2 border-2 border-black rounded-lg w-[24rem] text-black' placeholder='Enter Category Name'/>
        <div className='bg-black flex font-semibold rounded-lg px-4'>
        <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}
