package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.LoginDTO;
import com.example.dto.UserDTO;
import com.example.payload.response.LoginMesage;
import com.example.services.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping(path="/save")
    public ResponseEntity<String> saveUser(@RequestBody UserDTO userDTO) {
        String id = userService.addUser(userDTO);
        return ResponseEntity.ok(id);
    }
    
    @PostMapping(path="/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO, HttpSession session) {
        LoginMesage loginMesage = userService.loginUser(loginDTO);
        if (loginMesage.getStatus()) {
            session.setAttribute("user", loginDTO.getEmail()); // Store user info in session
        }
        return ResponseEntity.ok(loginMesage);
    }
    
    @PostMapping(path="/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.invalidate(); // Invalidate session to log out
        return ResponseEntity.ok("Logged out successfully");
    }
}
