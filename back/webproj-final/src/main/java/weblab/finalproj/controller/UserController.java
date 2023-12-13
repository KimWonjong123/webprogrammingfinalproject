package weblab.finalproj.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import weblab.finalproj.domain.User;
import weblab.finalproj.dto.*;
import weblab.finalproj.service.AuthService;
import weblab.finalproj.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UserController {

        private final UserService userService;

        private final AuthService authService;

        @PostMapping("/register")
        @ResponseStatus(HttpStatus.CREATED)
        public RegisterResponseDto register(@Validated @RequestBody RegisterRequestDto registerRequestDto) {
                RegisterResponseDto responseDto;
                responseDto = userService.register(registerRequestDto);
                return responseDto;
        }

        @PostMapping("/login")
        @ResponseStatus(HttpStatus.OK)
        public TokenResponseDto login(@Validated @RequestBody LoginRequestDto loginRequestDto) {
                TokenResponseDto responseDto;
                responseDto = authService.login(loginRequestDto);
                return responseDto;
        }


        @GetMapping("/me")
        @ResponseStatus(HttpStatus.OK)
        public UserInfoResponseDto getMe(Authentication authentication) {
                UserInfoResponseDto responseDto;
                responseDto = userService.getUserInfo((User)authentication.getPrincipal());
                return responseDto;
        }
}
