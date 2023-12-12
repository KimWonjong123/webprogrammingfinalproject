import { React, useState } from "react";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailCode, setEmailCode] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailCodeChange = (e) => {
        setEmailCode(e.target.value);
    };

    const handleEmailCheck = (e) => {
        e.preventDefault();
        const emailInput = document.querySelector(
            'input[type="email"]'
        );
        emailInput.disabled = true;
        axios
            .post("http://localhost:8080/api/email/verify", {
                email: email,
            })
            .then((res) => {
                setEmailCheck(res.data.success);
                console.log(res.data.success);
            })
            .catch((err) => {
                emailInput.disabled = false;
                console.log(err.response.data.message);
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (emailCheck !== true || emailCode === "") {
            console.log("Please check your email.");
            console.log(emailCheck);
            console.log(emailCode);
            return;
        }
        if (password === "" || name === "") {
            console.log("Please check your password or name.");
            return;
        }
        axios
            .post("http://localhost:8080/api/users/register", {
                name: name,
                email: email,
                rawPassword: password,
                code: emailCode,
            })
            .then((res) => {
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    return (
        <div className="Register">
            <header>
                <h1>Register Page</h1>
                <h2>hello</h2>
                <input
                    type="text"
                    onChange={handleNameChange}
                    placeholder="Enter your name."
                    required={true}
                />
                <input
                    type="email"
                    onChange={handleEmailChange}
                    placeholder="Enter your Email."
                    required={true}
                />
                <button onClick={handleEmailCheck}>Check Email</button>
                <input
                    type="text"
                    onChange={handleEmailCodeChange}
                    placeholder="Enter your Email verification code"
                    required={true}
                />
                <input
                    type="password"
                    onChange={handlePasswordChange}
                    placeholder="Enter your password."
                    required={true}
                />
                <button onClick={handleRegister}>Register</button>
            </header>
        </div>
    );
}

export default Register;
