package com.example.repo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
	List<Location> findByCity(String city);
}

