package weblab.finalproj.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import weblab.finalproj.domain.User;
import weblab.finalproj.dto.CommentResponseDto;
import weblab.finalproj.dto.CreateCommentRequestDto;
import weblab.finalproj.dto.UpdateCommentRequestDto;
import weblab.finalproj.service.CommentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{postId}")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponseDto createComment(@PathVariable("postId") Long postId,
                                            @RequestBody CreateCommentRequestDto createCommentRequestDto,
                                            @AuthenticationPrincipal User user) {
        return commentService.createComment(postId, createCommentRequestDto, user);
    }

    @PatchMapping("/{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public CommentResponseDto updateComment(@PathVariable("commentId") Long commentId,
                                            @RequestBody UpdateCommentRequestDto updateCommentRequestDto,
                                            @AuthenticationPrincipal User user) {
        return commentService.updateComment(commentId, updateCommentRequestDto, user);
    }

    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentResponseDto> getAllCommentOfUser(@PathVariable("userId") Long userId) {
        return commentService.getAllCommentOfUser(userId);
    }

}
