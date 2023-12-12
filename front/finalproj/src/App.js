import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import UserList from "./pages/User";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

function App() {
    return (
        <div className="App">
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
                <Link to="/user">Users</Link> | <Link to="login">Login</Link> |{" "}
                <Link to="/logout">Logout</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user" element={<UserList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    );
}

export default App;
