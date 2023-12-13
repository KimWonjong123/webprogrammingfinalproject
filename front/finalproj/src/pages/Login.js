import React from "react";
import { useState } from "react";
import { setCookie } from "../util/cookie";
import axois from "axios";
import {
    Form,
    Button,
    Container,
    FloatingLabel,
} from "react-bootstrap";

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
        <Container>
            <div className="Login">
                <Form>
                    <Form.Group className="mb-1" controlId="formEmail">
                        <FloatingLabel label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Enter your email."
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                required={true}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formPassword">
                        <FloatingLabel label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Enter your password."
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                required={true}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Button onClick={handleLogin}>
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Login;
