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
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/api/v1/user/**").permitAll() // Permit all requests to the user endpoint
                    .requestMatchers("/rooms/**").permitAll()
                    .anyRequest().authenticated() // Require authentication for other requests
            )

            .logout(logout ->
                logout
                    .permitAll() // Allow everyone to logout
            )
            .csrf(csrf -> csrf.disable()) // Disable CSRF protection if needed
            .sessionManagement(sessionManagement ->
                sessionManagement
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Create a session if needed
                    .maximumSessions(1) // Limit the number of concurrent sessions
            );

        return http.build();
    }
}
