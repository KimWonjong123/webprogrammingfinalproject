import React from "react";
import { Card, Container, Form, Stack, Modal, Badge, Button as Btn } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../util/cookie";
import "../styles/Postinfo.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Post() {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userId, setUserId] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const postId = useParams().id;
    const token = getCookie("token");
    const [config, setConfig] = useState({});

    const parseToken = (token) => {
        const payload = token.split(".")[1];
        const decodedPayload = atob(payload);
        const payloadObj = JSON.parse(decodedPayload);
        return payloadObj.id;
    };

    useEffect(() => {
        if (token) {
            setUserId(parseToken(token));
            setConfig({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        axios
            .get(`http://localhost:8080/api/post/${postId}`)
            .then((res) => {
                const p = res.data;
                const contentCopy = p.content;
                const contents = contentCopy.split("\n");
                p.content = contents.map((content) => {
                    return (
                        <>
                            {content}
                            <br />
                        </>
                    );
                });
                setPost(p);
                setComments(res.data.comments);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, [postId, token]);

    const handleDelete = () => {
        if (userId !== String(post.authorId)) {
            return;
        }
        axios
            .delete(`http://localhost:8080/api/post/${postId}`, config)
            .then((res) => {
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    const handleEdit = () => {
        if (userId !== String(post.authorId)) {
            return;
        }
        window.location.href = `/edit/${postId}`;
    }

    const handleCommentDelete = (comment) => {
        if (userId !== String(comment.authorId)) {
            return;
        }
        axios
            .delete(`http://localhost:8080/api/comment/${comment.id}`, config)
            .then((res) => {
                window.location.href = `/post/${postId}`;
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }
    
    const handleLeaveComment = () => {
        if (!newComment) {
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const body = {
            postId: postId,
            content: newComment,
        };
        axios
            .post(`http://localhost:8080/api/comment`, body, config)
            .then((res) => {
                window.location.href = `/post/${postId}`;
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    return (
        <Container>
            <div className="Post">
                <Card>
                    <Card.Header>
                        {post.authorName}
                        {token ? (
                            <>
                                <DeleteIcon
                                    style={{ float: "right" }}
                                    onClick={() => {
                                        setShowDeleteModal(true);
                                    }}
                                ></DeleteIcon>
                                <EditIcon
                                    style={{ float: "right" }}
                                    onClick={handleEdit}
                                ></EditIcon>
                            </>
                        ) : (
                            <></>
                        )}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        {post.content}
                        <footer>
                            <small className="text-muted">
                                {post.createdAt}
                            </small>
                        </footer>
                    </Card.Body>
                </Card>
            </div>
            {comments.length > 0 ? (
                <>
                    <br />
                    <p>{comments.length} comments</p>
                    <Stack gap={4} className="Home">
                        {comments.map((comment) => (
                            <Card>
                                <Card.Header>
                                    {comment.authorName}
                                    {token ? (
                                        <>
                                            <DeleteIcon
                                                style={{ float: "right" }}
                                                onClick={() => {
                                                    handleCommentDelete(
                                                        comment
                                                    );
                                                }}
                                            ></DeleteIcon>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{comment.content}</Card.Title>
                                    <footer>
                                        <small className="text-muted">
                                            {comment.createdAt}
                                        </small>
                                    </footer>
                                </Card.Body>
                            </Card>
                        ))}
                    </Stack>
                </>
            ) : (
                <></>
            )}
            <br />
            <Form>
                <Form.Group className="mb-3" controlId="formNewComment">
                    {token ? (
                        <>
                            <Form.Control
                                type="text"
                                placeholder="Enter comment"
                                onChange={(e) => {
                                    setNewComment(e.target.value);
                                }}
                            />
                            <br />
                            <Button
                                style={{ float: "left" }}
                                variant="contained"
                                onClick={handleLeaveComment}
                            >
                                Leave Comment
                            </Button>
                        </>
                    ) : (
                        <Form.Control
                            type="text"
                            placeholder="Please log in to leave a comment"
                            disabled
                        />
                    )}
                </Form.Group>
            </Form>
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Badge bg="danger">Warning</Badge>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure to delete post?</p>
                    <p>
                        Once you delete the post, it is impossible to recover
                        it.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Btn
                        variant="danger"
                        onClick={() => {
                            handleDelete();
                        }}
                    >
                        Delete
                    </Btn>
                    <Btn
                        variant="secondary"
                        onClick={() => {
                            setShowDeleteModal(false);
                        }}
                    >
                        Cancel
                    </Btn>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Post;
