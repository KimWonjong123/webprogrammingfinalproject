package weblab.finalproj.domain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "email_verification")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column
    @Setter
    private String code;

    @Column
    @Setter
    private Timestamp exp;

    @Builder
    public EmailVerification(String email, String code, Timestamp exp) {
        this.email = email;
        this.code = code;
        this.exp = exp;
    }
}
