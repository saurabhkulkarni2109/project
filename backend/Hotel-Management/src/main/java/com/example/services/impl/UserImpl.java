package com.example.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dto.LoginDTO;
import com.example.dto.UserDTO;
import com.example.entity.User;
import com.example.payload.response.LoginMesage;
import com.example.repo.UserRepo;

import com.example.services.UserService;


@Service
public class UserImpl implements UserService {

	@Autowired
	private UserRepo repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public String addUser(UserDTO userDTO) {
		// TODO Auto-generated method stub
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

	UserDTO userDTO;
	    @Override
	    public LoginMesage  loginUser(LoginDTO loginDTO) {
	        String msg = "";
	        User user1 = repo.findByEmail(loginDTO.getEmail());
	        if (user1 != null) {
	            String password = loginDTO.getPassword();
	            String encodedPassword = user1.getPassword();
	            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
	            if (isPwdRight) {
	                Optional<User> employee = repo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
	                if (employee.isPresent()) {
	                    return new LoginMesage("Login Success", true);
	                } else {
	                    return new LoginMesage("Login Failed", false);
	                }
	            } else {
	                return new LoginMesage("password Not Match", false);
	            }
	        }else {
	            return new LoginMesage("Email not exits", false);
	        }
	    }
}