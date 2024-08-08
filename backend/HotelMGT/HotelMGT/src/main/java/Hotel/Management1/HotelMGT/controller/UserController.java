package Hotel.Management1.HotelMGT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Hotel.Management1.HotelMGT.entity.User;
import Hotel.Management1.HotelMGT.service.UserService;



@RestController
public class UserController {
	 @Autowired
	 private UserService services;
	 
	 @GetMapping("/")
	 public Iterable<User>getUsers() 
	 {
		 return services.listAll();     
	 }
	 
	 @PostMapping(value = "/save")
	 private long saveUser(@RequestBody User users)   
	 {  
		 services.saveOrUpdate(users);  
		 return  users.getId();  
	 }
	 
	 @RequestMapping("/user/{id}")  
	 private User getUser(@PathVariable(name = "id") int userid)   
	 {  
	 return services.getStudentById(userid);  
	 }  
	 @PutMapping("/edit/{id}")

	    private User update(@RequestBody User users)   
	    {  
		   services.saveOrUpdate(users);  
	       return users;  
	    }  

	 @DeleteMapping("/delete/{id}")  
	 private void deleteUser(@PathVariable("id") int id)   
	 {  
		 services.delete(id);  
	 }  
}
