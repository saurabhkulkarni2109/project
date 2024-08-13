package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.Location;

public interface LocationRepo extends JpaRepository<Location, Long> {
}
