package weblab.finalproj.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import weblab.finalproj.domain.User;
import weblab.finalproj.dto.CreatePostRequestDto;
import weblab.finalproj.dto.PostListResponseDto;
import weblab.finalproj.dto.PostResponseDto;
import weblab.finalproj.dto.UpdatePostRequestDto;
import weblab.finalproj.service.PostService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/posts")
public class PostController {

    private final PostService postService;

    @GetMapping("/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public PostResponseDto getPost(@PathVariable("postId") Long postId) {
        PostResponseDto responseDto;
        responseDto = postService.getPost(postId);
        return responseDto;
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<PostListResponseDto> getAllPosts() {
        List<PostListResponseDto> responseDto;
        responseDto = postService.getAllPosts();
        return responseDto;
    }

    @GetMapping("/all/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<PostListResponseDto> getAllPostsFromUser(@PathVariable("userId") Long userId) {
        List<PostListResponseDto> responseDto;
        responseDto = postService.getAllPostsFromUser(userId);
        return responseDto;
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean deletePost(@PathVariable("postId") Long postId, @AuthenticationPrincipal User user) {
        boolean responseDto;
        responseDto = postService.deletePost(postId, user);
        return responseDto;
    }

    @PatchMapping("/{postId}")
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponseDto updatePost(@PathVariable("postId") Long postId, @RequestBody UpdatePostRequestDto updatePostRequestDto, @AuthenticationPrincipal User user) {
        PostResponseDto responseDto;
        responseDto = postService.updatePost(postId, updatePostRequestDto, user);
        return responseDto;
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponseDto createPost(@RequestBody CreatePostRequestDto createPostRequestDto, @AuthenticationPrincipal User user) {
        PostResponseDto responseDto;
        responseDto = postService.createPost(createPostRequestDto, user);
        return responseDto;
    }

}
