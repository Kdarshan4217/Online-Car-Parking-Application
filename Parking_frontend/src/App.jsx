import { Route, Routes } from "react-router-dom";

import NavBar from "./Components/NavBar";

import Home from "./Components/Home/Home";

import Contact from "./Components/ContactUs/contact";

import Footer from "./Components/Footer";
import Login from "./Components/Login/login";
import AboutUs from "./Components/About/about";

import RegisterForm from "./Components/Login/register";


function App() {
  return (
    <>
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signin" element={<RegisterForm />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
