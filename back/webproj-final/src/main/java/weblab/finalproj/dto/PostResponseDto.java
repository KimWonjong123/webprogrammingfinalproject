package weblab.finalproj.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import weblab.finalproj.domain.Comment;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class PostResponseDto {

        private Long id;

        private String title;

        private String content;

        private Long authorId;

        private String authorName;

        private LocalDateTime createdAt;

        private List<Comment> comments;
}
