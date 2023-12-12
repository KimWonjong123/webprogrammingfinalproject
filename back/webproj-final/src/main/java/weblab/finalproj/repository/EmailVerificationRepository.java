package weblab.finalproj.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import weblab.finalproj.domain.EmailVerification;

import java.sql.Timestamp;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class EmailVerificationRepository{

    private final EntityManager em;

    public void save(EmailVerification emailVerification) {
        try{
            EmailVerification ev = em.createQuery(
                    "select e from EmailVerification e where e.email = :email", EmailVerification.class)
                    .setParameter("email", emailVerification.getEmail()).getSingleResult();
            ev.setCode(emailVerification.getCode());
            ev.setExp(emailVerification.getExp());
            em.merge(ev);
        } catch (NoResultException e) {
            em.persist(emailVerification);
        }
    }

    public void deleteByEmail(String email) {
        EmailVerification ev = em.createQuery(
                "select e from EmailVerification e where e.email = :email", EmailVerification.class)
                .setParameter("email", email).getSingleResult();
        em.remove(ev);
    }

    public Optional<EmailVerification> getByEmail(String email) {
        try {
            EmailVerification ev = em.createQuery(
                    "select e from EmailVerification e where e.email = :email", EmailVerification.class)
                    .setParameter("email", email).getSingleResult();
            return Optional.of(ev);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public boolean isCodeValid(String email, String code) {
        try {
            EmailVerification ev = em.createQuery(
                    "select e from EmailVerification e where e.email = :email", EmailVerification.class)
                    .setParameter("email", email).getSingleResult();
            Timestamp exp = ev.getExp();
            return !exp.before(new Timestamp(System.currentTimeMillis()));

        } catch (NoResultException e) {
            return false;
        }
    }
}
