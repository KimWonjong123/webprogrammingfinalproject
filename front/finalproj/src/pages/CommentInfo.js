import React from "react";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../styles/Postinfo.css";

function CommentInfo(props) {
    const [comment, setComment] = useState({});

    useEffect(() => {
        setComment(props.comment);
        console.log(comment);
    }, [comment, props.comment]);

    return (
        <div className="Postinfo">
            <Card
                onClick={() => {
                    window.location.href = `/post/${comment.postId}`;
                }}
            >
                <Card.Header>{comment.authorName}</Card.Header>
                <Card.Body>
                    <Card.Title>{comment.content}</Card.Title>
                    <Card.Text>{comment.postTitle}</Card.Text>
                    <footer>
                        <small className="text-muted">
                            {comment.createdAt}
                        </small>
                    </footer>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CommentInfo;
