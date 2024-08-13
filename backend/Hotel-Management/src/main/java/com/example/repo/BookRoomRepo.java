package com.example.repo;
import com.example.entity.Booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRoomRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByRoomId(long roomId);
}
