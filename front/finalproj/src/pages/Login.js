import React from "react";
import { useState } from "react";
import { setCookie } from "../util/cookie";
import axois from "axios";
import {
    Form,
    Button,
    Container,
    FloatingLabel,
    Modal,
    OverlayTrigger,
    Tooltip,
    Badge,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(true);
    const {register, formState: { errors }, } = useForm({ mode: "onChange" });
    const errorToolTip = (message) => (
        <Tooltip>
            {message}
        </Tooltip>
    );

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (errors.email || errors.rawPassword || !email || !password) {
            return;
        }
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
                setLoginSuccess(false);
            });
    };

    return (
        <Container>
            <div className="Login">
                <Form>
                    <Form.Group className="mb-1" controlId="formEmail">
                        <FloatingLabel label="Email" className="mb-3">
                            <OverlayTrigger
                                placement="bottom"
                                show={errors.email ? true : false}
                                overlay={errorToolTip(errors.email?.message)}
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your Email."
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required.",
                                        },
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/i,
                                            message: "Email is invalid.",
                                        },
                                        onChange: handleEmailChange,
                                    })}
                                />
                            </OverlayTrigger>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formPassword">
                        <FloatingLabel label="Password" className="mb-3">
                            <OverlayTrigger
                                placement="bottom"
                                show={errors.rawPassword ? true : false}
                                overlay={errorToolTip(
                                    errors.rawPassword?.message
                                )}
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password."
                                    {...register("rawPassword", {
                                        required: {
                                            value: true,
                                            message: "Password is required.",
                                        },
                                        onChange: handlePasswordChange,
                                    })}
                                    aria-invalid={
                                        errors.rawPassword ? "true" : "false"
                                    }
                                />
                            </OverlayTrigger>
                        </FloatingLabel>
                    </Form.Group>
                    <Button onClick={handleLogin}>Login</Button>
                    <Modal
                        show={!loginSuccess}
                        onHide={() => setLoginSuccess(true)}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <Badge bg="danger">Login Failed</Badge>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Please check your email or password again.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setLoginSuccess(true)}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            </div>
        </Container>
    );
}

export default Login;
