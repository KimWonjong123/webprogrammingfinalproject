import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";

function App() {
    return (
        <div className="App">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    );
}

export default App;
