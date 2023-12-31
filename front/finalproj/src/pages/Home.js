import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";
import Postinfo from "../components/PostInfo";
import { Container, Stack } from "react-bootstrap";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/Home.css"

/*
    Component for home page
    If the user is logged in, show user's name
    If the user is not logged in, show "Stranger"
    Show all posts that are created by users
    User can create a post by clicking the edit button
    Or user can click the post to see the post
*/
function Home() {
    const [name, setName] = useState("");
    const [posts, setPosts] = useState([]);
    const token = getCookie("token");

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        if (token) {
            axios
                .get("http://localhost:8080/api/user/me", config)
                .then((res) => {
                    setName(res.data.name);
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        }
        axios
            .get("http://localhost:8080/api/post")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, [token]);

    return (
        <>
            <Container>
                {token ? <h1>Hello, {name}!</h1> : <h1>Hello, Stranger!</h1>}
                <Stack gap={4} className="Home">
                    {posts.map((post) => (
                        <Postinfo post={post} />
                    ))}
                </Stack>
            </Container>
            {token ? (
                <Fab
                    color="primary"
                    aria-label="edit"
                    id="edit-button"
                    onClick={() => {
                        window.location.href = "/create";
                    }}
                >
                    <EditIcon />
                </Fab>
            ) : (
                <></>
            )}
        </>
    );
}

export default Home;
