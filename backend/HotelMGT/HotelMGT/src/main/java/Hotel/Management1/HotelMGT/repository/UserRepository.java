package Hotel.Management1.HotelMGT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Hotel.Management1.HotelMGT.entity.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
