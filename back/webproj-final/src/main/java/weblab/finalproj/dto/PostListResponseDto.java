package weblab.finalproj.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class PostListResponseDto {

        private Long id;

        private String title;

        private Long authorId;

        private String authorName;

        private String createdAt;
}
