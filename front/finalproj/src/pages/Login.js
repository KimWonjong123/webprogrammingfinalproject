import React from "react";
import { useState } from "react";
import { setCookie } from "../util/cookie";
import axois from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        axois
            .post("http://localhost:8080/api/user/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                setCookie("token", res.data.token, { path: "/" });
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    return (
        <div className="Login">
            <header>
                <h1>login Page</h1>
                <h2>hello this is login page.</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    required={true}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Enter your password."
                    required={true}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={handleLogin}>login</button>
            </header>
        </div>
    );
}

export default Login;
