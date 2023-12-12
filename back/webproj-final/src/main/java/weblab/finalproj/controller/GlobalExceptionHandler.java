package weblab.finalproj.controller;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import weblab.finalproj.domain.ErrorResult;

import java.security.SignatureException;
import java.util.Arrays;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResult> handleResponseStatusException(ResponseStatusException e) {
        ErrorResult error = new ErrorResult(e.getStatusCode().value(), Arrays.asList(e.getReason()));
        return new ResponseEntity<>(error, e.getStatusCode());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalStateException.class)
    public ErrorResult handleIllegalStateException(IllegalStateException e) {
        return new ErrorResult(HttpStatus.BAD_REQUEST.value(), Arrays.asList(e.getMessage()));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult handleIllegalArgumentException(IllegalArgumentException e) {
        return new ErrorResult(HttpStatus.BAD_REQUEST.value(), Arrays.asList(e.getMessage()));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorResult handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return new ErrorResult(HttpStatus.BAD_REQUEST.value(),
                e.getFieldErrors()
                        .stream().map(error -> error.getDefaultMessage()).toList());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(SignatureException.class)
    public ErrorResult handleSignatureException(SignatureException e) {
        return new ErrorResult(HttpStatus.UNAUTHORIZED.value(), Arrays.asList(e.getMessage()));
    }
}
