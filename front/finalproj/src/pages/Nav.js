import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { getCookie } from "../util/cookie";
import "../styles/Nav.css";

function TopNav() {
    const token = getCookie("token");

    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">Final Project</Navbar.Brand>
            <Nav
                fill
                className="justify-content-center"
                variant="underline"
                defaultActiveKey="/home"
            >
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                {token ? (
                    <>
                        <Nav.Item>
                            <Nav.Link href="/mypage">My Page</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/logout">Log out</Nav.Link>
                        </Nav.Item>
                    </>
                ) : (
                    <>
                        <Nav.Item>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/login">Log in</Nav.Link>
                        </Nav.Item>
                    </>
                )}
            </Nav>
        </Navbar>
    );
}

export default TopNav;
