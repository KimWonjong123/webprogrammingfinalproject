package weblab.finalproj.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class CommentResponseDto {

            private Long id;

            private Long postId;

            private String content;

            private Long authorId;

            private String authorName;

            private String createdAt;
}
