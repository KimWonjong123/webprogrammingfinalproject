import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";
import Postinfo from "./PostInfo";
import { Container, Stack } from "react-bootstrap";

function Home() {
    const [name, setName] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = getCookie("token");
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
    }, []);

    return (
        <Container>
            <Stack gap={4} className="Home">
                {posts.map((post) => (
                    <Postinfo post={post} />
                ))}
            </Stack>
        </Container>
    );
}

export default Home;
