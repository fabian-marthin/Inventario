import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import Home from "./pages/Home";
import Inventario from "./pages/Inventario";
import Admin from "./pages/Admin";
import Default from "./pages/Default";

import "./css/home.css";
import "./css/admin.css";


function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>                
                <Route path="/inventario" element={<Inventario />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/*" element={<Default />}></Route>               
            </Routes>
        </BrowserRouter>
            
    );
}

export default App;


