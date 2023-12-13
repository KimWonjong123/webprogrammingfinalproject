import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TopNav from "./pages/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Mypage from "./pages/Mypage";

function App() {
    return (
        <div className="App">
            <TopNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/mypage" element={<Mypage />} />
            </Routes>
        </div>
    );
}

export default App;
