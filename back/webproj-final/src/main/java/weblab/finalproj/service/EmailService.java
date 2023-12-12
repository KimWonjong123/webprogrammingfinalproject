package weblab.finalproj.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import weblab.finalproj.domain.EmailVerification;
import weblab.finalproj.dto.VerifyEmailRequestDto;
import weblab.finalproj.dto.VerifyEmailResponseDto;
import weblab.finalproj.repository.EmailVerificationRepository;
import weblab.finalproj.repository.UserRepository;

import java.sql.Timestamp;
import java.util.HashMap;


@Service
@RequiredArgsConstructor
@Transactional
public class EmailService {

    private final UserRepository userRepository;

    private final EmailVerificationRepository emailVerificationRepository;

    private final JavaMailSender javaMailSender;

    private final SpringTemplateEngine templateEngine;

    @Value("${email.validity-in-milliseconds}")
    private Integer verificationValidityMilliSeconds;

    public VerifyEmailResponseDto verifyEmail(VerifyEmailRequestDto verifyEmailRequestDto) {
        String email = verifyEmailRequestDto.getEmail();
        validateDuplicateUser(email);
        String code = generateCode();
        EmailVerification emailVerification = EmailVerification.builder()
                .email(email)
                .code(code)
                .exp(new Timestamp(System.currentTimeMillis() + verificationValidityMilliSeconds))
                .build();
        emailVerificationRepository.save(emailVerification);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setSubject("이메일 인증 안내");
            helper.setTo(email);
            HashMap<String, String> emailContext = new HashMap<>();
            emailContext.put("code", code);
            emailContext.put("timeout", String.valueOf(verificationValidityMilliSeconds / 60000));
            Context context = new Context();
            emailContext.forEach((key, value)->{
                context.setVariable(key, value);
            });

            String html = templateEngine.process("email-verification", context);
            helper.setText(html, true);
            javaMailSender.send(message);
            return new VerifyEmailResponseDto();
        } catch (MessagingException | MailException e) {
            throw new IllegalStateException("메일 발송에 실패했습니다. 다시 시도해주세요.");
        }
    }

    public void validateDuplicateUser(String email) {
        userRepository.getByEmail(email)
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 존재하는 회원입니다.");
                });
    }

    private String generateCode() {
        return RandomStringUtils.randomAlphanumeric(6);
    }
}
