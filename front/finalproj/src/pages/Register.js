import React from "react";
import { useState } from "react";
import axios from "axios";
import {
    Form,
    Button,
    Container,
    FloatingLabel,
    Row,
    Col,
    Spinner
} from "react-bootstrap";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailCode, setEmailCode] = useState("");
    const [emailSending, setEmailSending] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

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
        setEmailSending(true);
        const emailInput = document.querySelector('input[type="email"]');
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
            })
            .finally(() => {
                setEmailSending(false);
            })
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
            .post("http://localhost:8080/api/user/register", {
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

    const btnWithSpinner = (
        <Button variant="primary" disabled>
            <Spinner as="span" size="sm" animation="border" role="status" />
            Sending...
        </Button>
    );

    const btnWithoutSpinner = (
        <Button
            variant="primary"
            onClick={handleEmailCheck}
        >
            Send Code
        </Button>
    );

    return (
        <Container>
            <div className="Register">
                <Form>
                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formName">
                            <FloatingLabel label="Name" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name."
                                    onChange={handleNameChange}
                                    required={true}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formEmail">
                            <FloatingLabel label="Email" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your Email."
                                    onChange={handleEmailChange}
                                    required={true}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group controlId="formEmailCheck" className="mb-3">
                            <Form.Text className="text-muted">
                                Press the button to send the verification code
                                to your email.
                            </Form.Text>
                            <br />
                            {
                                emailSending === true
                                    ? btnWithSpinner
                                    : btnWithoutSpinner
                            }
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formEmailCode">
                            <FloatingLabel
                                label="Email Verification Code"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Email verification code"
                                    onChange={handleEmailCodeChange}
                                    required={true}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPassword">
                            <FloatingLabel label="Password" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password."
                                    onChange={handlePasswordChange}
                                    required={true}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" onClick={handleRegister}>
                        Register
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Register;
