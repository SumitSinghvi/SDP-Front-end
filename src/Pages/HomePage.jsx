import React, { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos, MdDelete } from "react-icons/md";
import CategoryPage from "./CategoryPage";
import GeneratePage from "./GeneratePage";

export default function HomePage({ homePageNav, setHomePageNav }) {
  const userName = "Name";
  const [category, setCategory] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/category/" +
          userName,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (!data) {
            setErr(true);
            setCategory([]);
            return;
          }
          setCategory(data[0].categoryList);
          setErr(false);
        } else {
          console.error("Failed to send data.");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchData(); // Call fetchData immediately

  }, [userName]);
  return (
    <div className="py-[1rem] px-[2rem]">
      {homePageNav == "Category" && (
        <CategoryPage category={category} setHomePageNav={setHomePageNav} setCategory={setCategory} />
      )}
      {homePageNav != "Category" && (
        <GeneratePage category={homePageNav} setHomePageNav={setHomePageNav} />
      )}
    </div>
  );
}
