package weblab.finalproj.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import weblab.finalproj.domain.User;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Transactional
public class UserRepository{

    private final EntityManager em;

    public void save(User user) {
        em.persist(user);
    }

    public Optional<User> getById(Long id) {
        User user = em.find(User.class, id);
        return Optional.ofNullable(user);
    }

    public Optional<User> getByEmail(String email) {
        try {
            User user = em.createQuery("select m from User m where m.email = :email", User.class)
                    .setParameter("email", email).getSingleResult();
            return Optional.of(user);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public Optional<User> getByName(String name) {
        try {
            User user = em.createQuery("select m from User m where m.name = :name", User.class)
                    .setParameter("name", name).getSingleResult();
            return Optional.of(user);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public List<User> findAll() {
        return em.createQuery("select m from User m", User.class).getResultList();
    }
}
