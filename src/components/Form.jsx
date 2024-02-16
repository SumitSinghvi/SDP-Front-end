import React, { useState } from "react";
import { Link } from 'react-router-dom';

const DynamicForm = () => {
  const [keys, setKeys] = useState([""]);
  const [values, setValues] = useState([""]);
  const [quantity, setQuantity] = useState(1);
  const [displayData, setDisplayData] = useState([]);

  const handleKeyChange = (index, value) => {
    const updatedKeys = [...keys];
    updatedKeys[index] = value;
    setKeys(updatedKeys);
  };

  const handleValueChange = (index, value) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
  };

  const handleRemove = (index) => {
    const updatedKeys = [...keys];
    const updatedValues = [...values];

    updatedKeys.splice(index, 1);
    updatedValues.splice(index, 1);

    setKeys(updatedKeys);
    setValues(updatedValues);
  };

  const handleAdd = () => {
    setKeys([...keys, ""]);
    setValues([...values, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedData = keys.reduce((acc, currentKey, index) => {
      if (currentKey.trim() !== "") {
        acc[currentKey] = values[index];
      }
      return acc;
    }, {});
    console.log(combinedData);
    console.log(quantity);

    try {
      const response = await fetch(
        "http://35.200.144.243:3000/data",
        {
          // Update the URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            combinedData,
            quantity,
            userName:"Name",
            category:"something"
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        setDisplayData(data);
        alert("success");
      } else {
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="from-blue-200 to-blue-600 bg-gradient-to-b w-screen h-screen text-white p-5 flex flex-col items-center gap-5 overflow-y-scroll">
      <h1 className="text-2xl font-bold font-sans">Generate UIDs</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 w-[30%]"
      >
        {keys.map((key, index) => (
          <div key={index} className="flex flex-col gap-3 w-full">
            <input
              id={`key-${index}`}
              value={key}
              placeholder="Enter Key"
              className="text-black p-3 rounded-xl outline-none w-full"
              onChange={(e) => handleKeyChange(index, e.target.value)}
              required
            />
            <input
              id={`value-${index}`}
              value={values[index]}
              placeholder="Enter Value"
              className="text-black p-3 rounded-xl outline-none w-full"
              onChange={(e) => handleValueChange(index, e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="bg-blue-800 hover:bg-yellow-400 text-white font-bold p-3 rounded-xl w-full transition-all ease-linear duration-300"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-800 transition-all ease-linear duration-300 hover:bg-yellow-400 w-full rounded-xl font-bold p-3"
        >
          Add Attribute
        </button>
        <div className="bg-blue-200 rounded-xl h-1 w-full"></div>
        <input
          className="text-black p-3 w-full rounded-xl outline-none"
          type="number"
          placeholder="Enter UIDs Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          required
        ></input>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-yellow-400 transition-all ease-linear duration-300  w-full rounded-xl font-bold p-3"
        >
          Submit
        </button>
      </form>
      <Link to="/layout" className="w-[30%]">
        <button className="bg-blue-800 text-white font-bold font-sans hover:bg-yellow-400 transition-all ease-linear duration-300 px-6 py-3 rounded-xl w-full">
          Go Back
        </button>
      </Link>
      {displayData && displayData.map((item, index) => (
        <div key={index}>
        {Object.keys(item).map((key) => (
          <p key={key}>
            {key}: {item[key]}
          </p>
        ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
