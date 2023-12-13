package weblab.finalproj.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import weblab.finalproj.domain.Post;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Transactional
public class PostRepository {

    private final EntityManager em;

    public void save(Post post) {
        em.persist(post);
    }

    public Optional<Post> getById(Long id) {
        return Optional.ofNullable(em.find(Post.class, id));
    }

    public void delete(Post post) {
        em.remove(post);
    }

    public void update(Post post) {
        em.merge(post);
    }

    public List<Post> findAll(Long userId) {
        return em.createQuery("select m from Post m where m.author.id = :userId", Post.class)
                .setParameter("userId", userId).getResultList();
    }

    public List<Post> findAll() {
        return em.createQuery("select m from Post m", Post.class).getResultList();
    }
}
