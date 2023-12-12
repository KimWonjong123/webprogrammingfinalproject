package weblab.finalproj.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import weblab.finalproj.dto.VerifyEmailRequestDto;
import weblab.finalproj.dto.VerifyEmailResponseDto;
import weblab.finalproj.service.EmailService;

@RestController
@RequiredArgsConstructor
@RequestMapping("email")
public class EmailController {

        private final EmailService emailService;

        @PostMapping("/verify")
        @ResponseStatus(HttpStatus.CREATED)
        public VerifyEmailResponseDto verifyEmail(@Validated @RequestBody VerifyEmailRequestDto verifyEmailRequestDto) {
                VerifyEmailResponseDto responseDto;
                responseDto = emailService.verifyEmail(verifyEmailRequestDto);
                return responseDto;
        }
}
