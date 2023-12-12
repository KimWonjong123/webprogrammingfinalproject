package weblab.finalproj.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import weblab.finalproj.domain.User;
import weblab.finalproj.dto.LoginRequestDto;
import weblab.finalproj.dto.TokenResponseDto;
import weblab.finalproj.jwt.TokenProvider;
import weblab.finalproj.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final TokenProvider tokenProvider;

    public TokenResponseDto login(LoginRequestDto loginRequestDto) {
        User user = validateCredential(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        return tokenProvider.generateJwt(user);
    }

    private User validateCredential(String loginId, String password) {
        User user = userRepository.getByEmail(loginId)
                .orElseThrow(() -> new IllegalArgumentException("이메일 혹은 비밀번호가 일치하지 않습니다."));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("이메일 혹은 비밀번호가 일치하지 않습니다.");
        }
        return user;
    }
}
