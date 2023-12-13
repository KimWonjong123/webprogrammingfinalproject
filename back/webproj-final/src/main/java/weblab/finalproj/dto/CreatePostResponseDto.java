package weblab.finalproj.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreatePostResponseDto {

    private Long userId;

    private String title;

    private String content;

    private LocalDateTime createdAt;
}
