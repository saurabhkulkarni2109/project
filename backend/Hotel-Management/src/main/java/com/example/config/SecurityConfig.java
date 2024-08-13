package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // Enable CORS
            .and()
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                .requestMatchers("/rooms/**").permitAll()
                .requestMatchers("/hotels/**").permitAll()
                .requestMatchers("/locations/**").permitAll()
                .requestMatchers("/bookings/**").permitAll()
                    .anyRequest().permitAll() // Permits all requests
            )
            .csrf(csrf -> csrf.disable()) // Disable CSRF
            .sessionManagement(sessionManagement ->
                sessionManagement
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                    .maximumSessions(1)
            );

        return http.build();
    }


}
