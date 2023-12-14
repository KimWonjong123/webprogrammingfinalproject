package weblab.finalproj.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import weblab.finalproj.domain.Comment;
import weblab.finalproj.domain.Post;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class PostResponseDto {

    private Long id;

    private String title;

    private String content;

    private Long authorId;

    private String authorName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;

    private List<CommentResponseDto> comments;

    public PostResponseDto(Post post, List<Comment> comments) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.authorId = post.getAuthor().getId();
        this.authorName = post.getAuthor().getName();
        this.createdAt = post.getCreatedAt();
        this.comments = comments.stream().map(CommentResponseDto::new).toList();
    }
}
