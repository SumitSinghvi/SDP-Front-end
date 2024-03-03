import React, { useState } from 'react';

const Dropdown = (title) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button>{item.title}</button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-black text-white rounded shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-800">Option 1</li>
            <li className="px-4 py-2 hover:bg-gray-800">Option 2</li>
            <li className="px-4 py-2 hover:bg-gray-800">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
