package weblab.finalproj.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import weblab.finalproj.domain.Comment;
import weblab.finalproj.domain.Post;
import weblab.finalproj.domain.User;
import weblab.finalproj.dto.*;
import weblab.finalproj.repository.CommentRepository;
import weblab.finalproj.repository.PostRepository;
import weblab.finalproj.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    public PostResponseDto createPost(CreatePostRequestDto createPostDto, User user) {
        Post post = new Post(user, createPostDto.getTitle(), createPostDto.getContent());
        postRepository.save(post);
        return toPostResponseDto(post, List.of());
    }

    public PostResponseDto updatePost(Long postId, UpdatePostRequestDto updatePostDto, User user) {
        Post post = postRepository.getById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        if (!post.getAuthor().getId().equals(user.getId())) {
            throw new IllegalArgumentException("해당 게시글의 작성자가 아닙니다.");
        }
        post.edit(updatePostDto.getTitle(), updatePostDto.getContent());
        postRepository.update(post);
        return toPostResponseDto(post, commentRepository.getAllByPostId(post.getId()));
    }

    public boolean deletePost(Long postId, User user) {
        Post post = postRepository.getById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        commentRepository.getAllByPostId(postId).forEach(commentRepository::delete);
        if (!post.getAuthor().equals(user)) {
            throw new IllegalArgumentException("해당 게시글의 작성자가 아닙니다.");
        }
        postRepository.delete(post);
        return true;
    }

    public PostResponseDto getPost(Long postId) {
        return toPostResponseDto(postRepository.getById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")), commentRepository.getAllByPostId(postId));
    }

    public List<PostListResponseDto> getAllPosts() {
        return postRepository.findAll().stream().map(this::toPostListResponseDto).toList();
    }

    public List<PostListResponseDto> getAllPostsFromUser(Long userId) {
        return postRepository.findAll(userId).stream().map(this::toPostListResponseDto).toList();
    }

    private PostResponseDto toPostResponseDto(Post post, List<Comment> comments) {
        return new PostResponseDto(post.getId(), post.getTitle(), post.getContent(), post.getAuthor().getId(), post.getAuthor().getName(), post.getCreatedAt(), comments);
    }

    private PostListResponseDto toPostListResponseDto(Post post) {
        return new PostListResponseDto(post.getId(), post.getTitle(), post.getAuthor().getId(), post.getAuthor().getName(), post.getCreatedAt());
    }
}
