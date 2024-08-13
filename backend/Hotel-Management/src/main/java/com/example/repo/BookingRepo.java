package com.example.repo;

import com.example.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    // Define method to find bookings by room ID
    List<Booking> findByRoomId(Long roomId);
}
