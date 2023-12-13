package weblab.finalproj.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import weblab.finalproj.domain.Comment;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Transactional
public class CommentRepository {

    private final EntityManager em;

    public void save(Comment comment) {
        em.persist(comment);
    }

    public void delete(Comment comment) {
        em.remove(comment);
    }

    public void update(Comment comment) {
        em.merge(comment);
    }

    public Optional<Comment> getById(Long id) {
        return Optional.ofNullable(em.find(Comment.class, id));
    }

    public List<Comment> getAllByPostId(Long postId) {
        return em.createQuery("select m from Comment m where m.post.id = :postId", Comment.class)
                .setParameter("postId", postId).getResultList();
    }
}
