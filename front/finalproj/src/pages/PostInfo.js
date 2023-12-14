import React from "react";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../styles/Postinfo.css";

/*
    Component for displaying a single post card in My Page and Home
    Used in MyPage.js and Home.js
*/
function Postinfo(props) {
    const [post, setPost] = useState({});

    useEffect(() => {
        setPost(props.post);
    }, [post, props.post]);

    return (
        <div className="Postinfo">
            <Card
                onClick={() => {
                    window.location.href = `/post/${post.id}`;
                }}
            >
                <Card.Header>{post.authorName}</Card.Header>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <footer>
                        <small className="text-muted">{post.createdAt}</small>
                    </footer>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Postinfo;
