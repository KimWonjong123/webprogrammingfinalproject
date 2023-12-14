import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import TopNav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Mypage from "./pages/Mypage";
import Create from "./pages/Create";
import Post from "./pages/Post";
import Edit from "./pages/Edit";

function App() {
    return (
        <div className="App">
            <TopNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/create" element={<Create />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/edit/:id" element={<Edit />} />

            </Routes>
        </div>
    );
}

export default App;
