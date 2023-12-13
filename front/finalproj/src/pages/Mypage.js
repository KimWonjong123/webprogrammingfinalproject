import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";
import axios from "axios";

function Mypage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const token = getCookie("token");
        if (!token) {
            window.location.href = "/";
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get("http://localhost:8080/api/user/me", config)
            .then((res) => {
                setName(res.data.name);
                setEmail(res.data.email);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, [])

    return (
        <div className="My">
            <header>
                <h1>My Page</h1>
                <h2>hello this is my page.</h2>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ name }</td>
                        <td>{ email }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Mypage;