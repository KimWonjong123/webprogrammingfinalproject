import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "../util/cookie";
import { Form, Container, Modal, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

/*
    Component for editing a post
    If the user is not logged in, redirect to login page
    If user press submit button without title or content, shows modal
    After editing a post, redirect to post page
*/
function Edit() {
    const token = getCookie("token");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const postId = useParams().id;

    useEffect(() => {
        if (!token) {
            window.location.href = "/";
            return;
        }
        axios.get(`http://localhost:8080/api/post/${postId}`)
            .then((res) => {
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, [token, postId]);
    const handleSubmit = () => {
        if (!title || !content) {
            setShowModal(true);
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const body = {
            title: title,
            content: content,
        };
        axios
            .patch(`http://localhost:8080/api/post/${postId}`, body, config)
            .then((res) => {
                window.location.href = `/post/${postId}`;
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    return (
        <Container>
            <div className="create">
                <h1>Edit Post</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={20}
                            cols={100}
                            placeholder="Enter content"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>{" "}
            {showModal ? (
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Badge bg="danger">Error</Badge>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please fill your title and content.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <></>
            )}
        </Container>
    );
}

export default Edit;
