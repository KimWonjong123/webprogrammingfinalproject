import React from "react";
import { useState } from "react";
import axios from "axios";
import {
    Form,
    Button,
    Container,
    FloatingLabel,
    Spinner,
    Modal,
    OverlayTrigger,
    Tooltip,
    Badge,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailCode, setEmailCode] = useState("");
    const [emailSending, setEmailSending] = useState(false);
    const [sendingCodeSuccess, setSendingCodeSuccess] = useState(true);
    const [registerSuccess, setRegisterSuccess] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange"});
    const errorToolTip = (message) => (
        <Tooltip>
            {message}
        </Tooltip>
    );

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

    const handleClose = () => setModalShow(false);

    const handleEmailCheck = (e) => {
        e.preventDefault();
        if (errors.email !== undefined || email === "") {
            return;
        }
        setEmailSending(true);
        const emailInput = document.querySelector('input[type="email"]');
        emailInput.disabled = true;
        axios
            .post("http://localhost:8080/api/email/verify", {
                email: email,
            })
            .then((res) => {
                setEmailCheck(res.data.success);
                setModalShow(true);
            })
            .catch((err) => {
                emailInput.disabled = false;
                console.log(err.response.data.message);
                setSendingCodeSuccess(false);
            })
            .finally(() => {
                setEmailSending(false);
            })
    };

    const handleError = (e) => {
        console.log(e);
    };

    const handleRegister = (data) => {
        if (emailCheck !== true || emailCode === "") {
            return;
        }
        if (password === "" || name === "") {
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
                setRegisterSuccess(false);
            });
    };

    const btnWithSpinner = (
        <Button variant="primary" disabled>
            <Spinner as="span" size="sm" animation="border" role="status" />
            Sending...
        </Button>
    );

    const btnWithoutSpinner = (
        <Button variant="primary" onClick={handleEmailCheck}>
            Send Code
        </Button>
    );

    return (
        <Container>
            <div className="Register">
                <Form>
                    <Form.Group controlId="formName">
                        <FloatingLabel label="Name" className="mb-3">
                            <OverlayTrigger
                                placement="bottom"
                                show={errors.name ? true : false}
                                overlay={errorToolTip(errors.name?.message)}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name."
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required.",
                                        },
                                        onChange: handleNameChange,
                                    })}
                                    aria-invalid={
                                        errors.name ? "true" : "false"
                                    }
                                />
                            </OverlayTrigger>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
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
                    <Form.Group controlId="formEmailCheck" className="mb-3">
                        <Form.Text className="text-muted">
                            Press the button to send the verification code to
                            your email.
                        </Form.Text>
                        <br />
                        {emailSending === true
                            ? btnWithSpinner
                            : btnWithoutSpinner}
                        {sendingCodeSuccess === false ? (
                            <Badge bg="danger">Sending Failed. Please try again.</Badge>
                        ) : null}
                    </Form.Group>
                    <Form.Group controlId="formEmailCode">
                        <FloatingLabel
                            label="Email Verification Code"
                            className="mb-3"
                        >
                            <OverlayTrigger
                                placement="bottom"
                                show={errors.code ? true : false}
                                overlay={errorToolTip(errors.code?.message)}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Email verification code"
                                    {...register("code", {
                                        required: {
                                            value: true,
                                            message: "Code is required.",
                                        },
                                        maxLength: {
                                            value: 6,
                                            message: "Code is invalid.",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Code is invalid.",
                                        },
                                        onChange: handleEmailCodeChange,
                                    })}
                                    aria-invalid={
                                        errors.code ? "true" : "false"
                                    }
                                />
                            </OverlayTrigger>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
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
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password Should be minimum 8 characters.",
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                                            message:
                                                "Password should contain at least one uppercase, one lowercase, one number and one special character.",
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
                    <Button
                        variant="primary"
                        onClick={handleSubmit(handleRegister, handleError)}
                    >
                        Register
                    </Button>
                    {registerSuccess === false ? (
                        <Badge bg="danger">Register Failed. Please try again.</Badge>
                    ) : null}
                </Form>
                <Modal show={modalShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Verification Code Has Been Sent!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please check you email inbox and enter the code.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
}

export default Register;
