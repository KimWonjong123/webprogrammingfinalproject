package weblab.finalproj;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import weblab.finalproj.jwt.JwtAuthenticationEntryPoint;
import weblab.finalproj.jwt.JwtAuthenticationFilter;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class AuthConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final JwtAuthenticationEntryPoint entryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(
                        csrf -> csrf.disable()
                )
                .authorizeHttpRequests(
                        authorizeRequests -> authorizeRequests
                                .requestMatchers("/api/user/register").permitAll()
                                .requestMatchers("/api/email/verify").permitAll()
                                .requestMatchers("/api/user/login").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/post/**").permitAll()
                                .anyRequest().authenticated()
                )
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )
                .exceptionHandling(
                        handler -> handler.authenticationEntryPoint(entryPoint)
                )
                .sessionManagement(
                        sessionManagement -> sessionManagement.disable()
                )
                .formLogin(
                        formLogin -> formLogin.disable()
                )
                .httpBasic(
                        httpBasic -> httpBasic.disable()
                )
                .headers(
                        headers -> headers.frameOptions(
                                frameOptions -> frameOptions.disable()
                        )
                );

        return httpSecurity.build();
    }
}
