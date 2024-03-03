import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Category from "./components/Category";
import { useState } from "react";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AppPage from "./Screen/AppPage";
import SearchPage from "./Screen/SearchPage";

function App() {
  const [category, setCategory] = useState(['Category']);
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/form' element={<Form />} />
          <Route path='/category' element={<Category category={category} setCategory={setCategory} />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registerss' element={<RegisterPage />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/App' element={<AppPage />} />
          <Route path='/layout' element={<Layout />} />
          <Route path='/verify' element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
