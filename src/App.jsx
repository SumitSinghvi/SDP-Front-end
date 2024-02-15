import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Search from "./components/Search";
import Category from "./components/Category";
import { useState } from "react";

function App() {
  const [category, setCategory] = useState(['Category']);
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/form' element={<Form />} />
          <Route path='/category' element={<Category category={category} setCategory={setCategory} />} />
          <Route path='/' element={<Home />} />
          <Route path='/layout' element={<Layout />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
