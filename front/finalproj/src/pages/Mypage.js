import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";
import axios from "axios";
import { Container, Tabs, Tab, Row, Col, Stack } from "react-bootstrap";
import Postinfo from "../components/PostInfo";
import CommentInfo from "../components/CommentInfo";

/*
    Component for mypage
    If the user is not logged in, redirect to login page
    Show user's profile, posts, and comments
    User can click the post or comment to see the post or comment
*/
function Mypage() {
    const [profile, setProfile] = useState({});
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const parseToken = (token) => {
        const payload = token.split(".")[1];
        const decodedPayload = atob(payload);
        const payloadObj = JSON.parse(decodedPayload);
        return payloadObj.id;
    }

    const id = parseToken(getCookie("token"));

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
                setProfile(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
        axios
            .get(`http://localhost:8080/api/post/user/${id}`, config)
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
        axios
            .get(`http://localhost:8080/api/comment/user/${id}`, config)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, [id]);

    return (
        <Container>
            <div className="My">
                <Tabs defaultActiveKey="profile" className="mb-3" fill>
                    <Tab eventKey="profile" title="Profile">
                        <header>
                            <h1>My Profile</h1>
                            <Row>
                                <Col>Name</Col>
                                <Col>{profile.name}</Col>
                            </Row>
                            <Row>
                                <Col>Email</Col>
                                <Col>{profile.email}</Col>
                            </Row>
                            <Row>
                                <Col>Joined Date</Col>
                                <Col>{profile.createdAt}</Col>
                            </Row>
                        </header>
                    </Tab>
                    <Tab eventKey="post" title="My Posts">
                        <header>
                            <h1>My Posts</h1>
                        </header>
                        <Stack gap={4}>
                            {posts.map((post) => (
                                <Postinfo post={post} />
                            ))}
                        </Stack>
                    </Tab>
                    <Tab eventKey="comment" title="My Comments">
                        <header>
                            <h1>My Comments</h1>
                        </header>
                        <Stack gap={4}>
                            {comments.map((comment) => (
                                <CommentInfo comment={comment} />
                            ))}
                        </Stack>
                    </Tab>
                </Tabs>
            </div>
        </Container>
    );
}

export default Mypage;
