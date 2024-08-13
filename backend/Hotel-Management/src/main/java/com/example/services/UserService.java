package com.example.services;

import com.example.dto.LoginDTO;
import com.example.dto.UserDTO;
import com.example.payload.response.LoginMesage;

public interface UserService {
    String addUser(UserDTO userDTO);
    LoginMesage loginUser(LoginDTO loginDTO);
    boolean userExists(Long userId); // Add this method
}
