import React, {useState} from "react";
import { IoMdAdd } from "react-icons/io";
import { TbArrowBackUp } from "react-icons/tb";
import ExcelJS from 'exceljs';

export default function GeneratePage({ category, setHomePageNav }) {
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
    console.log("combinedData",combinedData);
    console.log(quantity);

    try {
      const response = await fetch("http://35.200.144.243:3000/data", {
        // Update the URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          combinedData,
          quantity,
          userName: "Name",
          category: category,
        }),
      });

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

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add headers
    const headers = Object.keys(displayData[0]);
    worksheet.addRow(headers);

    
    // Add data rows
    displayData.forEach(row => {
      const rowData = headers.map(header => row[header]);
      worksheet.addRow(rowData);
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
  console.log(displayData)
  return (
    <div>
      <button className="p-[0.5rem] bg-gray-600 rounded-sm" onClick={() => {setHomePageNav('Category')}}>
        <TbArrowBackUp />
      </button>
      <h1 className="text-[3rem] font-bold font-sans">Generate UIDs</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md p-[1rem] flex flex-col items-center gap-3"
      >
        {keys.map((key, index) => (
          <div key={index} className="flex gap-3 w-full">
            <input
              id={`key-${index}`}
              value={key}
              placeholder="Enter Key"
              className="text-black border-black border-2 p-3 rounded-sm outline-none w-full"
              onChange={(e) => handleKeyChange(index, e.target.value)}
              required
            />
            <input
              id={`value-${index}`}
              value={values[index]}
              placeholder="Enter Value"
              className="text-black p-3 border-black border-2 rounded-sm outline-none w-full"
              onChange={(e) => handleValueChange(index, e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="bg-black text-white font-bold p-3 rounded-sm w-full"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAdd}
          className="bg-black mr-auto rounded-sm font-bold p-3"
        >
          <IoMdAdd />
        </button>
        <div className="mr-auto flex gap-4">
        <input
          className="text-black p-3 border-black border-2 rounded-sm"
          type="number"
          placeholder="Enter UIDs Quantity"
          max="10"
          onChange={(e) => setQuantity(e.target.value)}
          required
        ></input>
        <button
          type="submit"
          className="bg-black rounded-sm font-bold p-3"
        >
          Submit
        </button>
        </div>
      </form>
      {displayData.length !=0 &&  
        (
          <button onClick={handleDownload} className="mt-[2rem] p-[1rem] rounded-sm bg-green-600 font-semibold uppercase text-black">Download Uid Excel File</button>
        )
      }
    </div>
  );
}
