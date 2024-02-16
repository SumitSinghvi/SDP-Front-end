import React, { useRef } from "react";
import { MdOutlineArrowForwardIos, MdDelete } from "react-icons/md";

export default function CategoryPage({
  category,
  setHomePageNav,
  setCategory,
}) {
  const categoryRef = useRef();
  const handleRemove = async (element,index) => {
    const updatedCategory = [...category];

    updatedCategory.splice(index, 1);
    try {
      const response = await fetch("http://35.200.144.243:3000/deleteCategory", {
        // Update the URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: element,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        setCategory(updatedCategory);
        alert("success");
      } else {
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://35.200.144.243:3000/categoryList", {
        // Update the URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: categoryRef.current.value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        setCategory([...category, data]);
        alert("success");
      } else {
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
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
                <span onClick={() => handleRemove(element,index)}>
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

      <div className="flex p-[2rem] bg-white border rounded-md gap-4 mt-[2rem]">
        <input
          ref={categoryRef}
          type="text"
          className="p-2 border-2 border-black rounded-lg w-[24rem] text-black"
          placeholder="Enter Category Name"
        />
        <div className="bg-black flex font-semibold rounded-lg px-4">
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}
