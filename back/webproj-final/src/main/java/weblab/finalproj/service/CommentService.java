package weblab.finalproj.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import weblab.finalproj.domain.Comment;
import weblab.finalproj.domain.Post;
import weblab.finalproj.domain.User;
import weblab.finalproj.dto.CommentResponseDto;
import weblab.finalproj.dto.CreateCommentRequestDto;
import weblab.finalproj.dto.UpdateCommentRequestDto;
import weblab.finalproj.repository.CommentRepository;
import weblab.finalproj.repository.PostRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final PostRepository postRepository;

    private final CommentRepository commentRepository;

    public CommentResponseDto createComment(CreateCommentRequestDto createCommentDto, User user) {
        Post post = postRepository.getById(createCommentDto.getPostId()).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
        Comment comment = new Comment(user, createCommentDto.getContent(), post);
        commentRepository.save(comment);
        return toCommentResponseDto(comment);
    }

    public CommentResponseDto updateComment(Long commentId, UpdateCommentRequestDto updateCommentDto, User user) {
        Comment comment = commentRepository.getById(commentId).orElseThrow(
                () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다.")
        );
        if (!comment.getAuthor().getId().equals(user.getId())) {
            throw new IllegalArgumentException("해당 댓글의 작성자가 아닙니다.");
        }
        comment.edit(updateCommentDto.getContent());
        commentRepository.update(comment);
        return toCommentResponseDto(comment);
    }

    public boolean deleteComment(Long commentId, User user) {
        Comment comment = commentRepository.getById(commentId).orElseThrow(
                () -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다.")
        );
        if (!comment.getAuthor().getId().equals(user.getId())) {
            throw new IllegalArgumentException("해당 댓글의 작성자가 아닙니다.");
        }
        commentRepository.delete(comment);
        return true;
    }

    public List<CommentResponseDto> getAllCommentOfUser(Long userId) {
        return commentRepository.findAllByUserId(userId).stream().map(this::toCommentResponseDto).toList();
    }

    private CommentResponseDto toCommentResponseDto(Comment comment) {
        return new CommentResponseDto(comment);
    }
}
