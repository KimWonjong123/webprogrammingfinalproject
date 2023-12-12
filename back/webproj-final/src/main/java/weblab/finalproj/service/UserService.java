package weblab.finalproj.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import weblab.finalproj.domain.User;
import weblab.finalproj.dto.RegisterRequestDto;
import weblab.finalproj.dto.RegisterResponseDto;
import weblab.finalproj.dto.UserInfoResponseDto;
import weblab.finalproj.repository.EmailVerificationRepository;
import weblab.finalproj.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private final EmailVerificationRepository emailVerificationRepository;

    private final PasswordEncoder passwordEncoder;

    public RegisterResponseDto register(RegisterRequestDto registerRequestDto) {
        validateDuplicateUser(registerRequestDto.getEmail());
        validateEmailVerification(registerRequestDto.getEmail(), registerRequestDto.getCode());
        emailVerificationRepository.deleteByEmail(registerRequestDto.getEmail());
        String encodedPassword = passwordEncoder.encode(registerRequestDto.getRawPassword());
        User user = new User(registerRequestDto.getName(), registerRequestDto.getEmail(), encodedPassword);
        userRepository.save(user);
        User savedUser = userRepository.getByEmail(registerRequestDto.getEmail()).get();
        return new RegisterResponseDto(savedUser.getId(), savedUser.getEmail());
    }

    public UserInfoResponseDto getUserInfo(User user) {
        return new UserInfoResponseDto(user.getId(), user.getName(), user.getEmail());
    }

    public Optional<User> findById(Long id) {
        return userRepository.getById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    private void validateDuplicateUser(String email) {
        userRepository.getByEmail(email)
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 존재하는 회원입니다.");
                });
    }

    private void validateEmailVerification(String email, String code) {
        emailVerificationRepository.getByEmail(email)
                .ifPresentOrElse(
                        ev -> {
                            boolean validation = ev.getCode().equals(code) &&
                                    ev.getEmail().equals(email) &&
                                    emailVerificationRepository.isCodeValid(email, code);
                            if (validation) {
                                return;
                            }

                            throw new IllegalArgumentException("인증 코드가 유효하지 않습니다.");
                        },
                        () -> {
                            throw new IllegalArgumentException("인증 코드가 유효하지 않습니다.");
                        });
    }
}
