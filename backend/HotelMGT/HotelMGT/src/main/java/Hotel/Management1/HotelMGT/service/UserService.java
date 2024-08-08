package Hotel.Management1.HotelMGT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Hotel.Management1.HotelMGT.entity.User;
import Hotel.Management1.HotelMGT.repository.UserRepository;


@Service
public class UserService {

	@Autowired
    private UserRepository repo;
	
	public Iterable<User> listAll() {
        return this.repo.findAll();
    }
	
	public void saveOrUpdate(User users)   
	{  
		repo.save(users);  
	} 
	public User getStudentById(long id)   
	{  
		return repo.findById(id).get();  
	}
	
	public void update(User users, int id)   
	{  
		repo.save(users);  
	}  	

	public void delete(long id)   
	{  
		repo.deleteById(id);  
	}  
}
