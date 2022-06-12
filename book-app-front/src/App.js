// import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutProject from "./pages/AboutProject";
import Addbook from "./pages/Addbook";
import Allbookcart from "./pages/Allbookcart";
import Allusers from "./pages/Allusers";
import Editbook from "./pages/Editbook";
import Editcart from "./pages/Editcart";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/cart" element={<Allbookcart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editproduct" element={<Editbook />} />
          <Route path="/addbook" element={<Addbook />} />
          <Route path="/update/:id" element={<Addbook />} />
          <Route path="/allusers" element={<Allusers />} />
          <Route path="cartpage/:id" element={<Editcart />} />
          <Route path="/about" element={<AboutProject />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
