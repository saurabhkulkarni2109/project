package com.example.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dto.LoginDTO;
import com.example.dto.UserDTO;
import com.example.entity.User;
import com.example.payload.response.LoginMesage;
import com.example.repo.UserRepo;
import com.example.services.UserService;

import java.util.Optional;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDTO userDTO) {
        User user = new User(
                userDTO.getId(),
                userDTO.getFirstname(),
                userDTO.getLastname(),
                userDTO.getUsername(),
                userDTO.getEmail(),
                this.passwordEncoder.encode(userDTO.getPassword())
        );
        repo.save(user);
        return user.getFirstname();
    }

    @Override
    public LoginMesage loginUser(LoginDTO loginDTO) {
        User user = repo.findByEmail(loginDTO.getEmail());
        if (user != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                return new LoginMesage("Login Success", true);
            } else {
                return new LoginMesage("Password does not match", false);
            }
        } else {
            return new LoginMesage("Email does not exist", false);
        }
    }

    @Override
    public boolean userExists(Long userId) {
        return repo.existsById(userId);
    }
}
