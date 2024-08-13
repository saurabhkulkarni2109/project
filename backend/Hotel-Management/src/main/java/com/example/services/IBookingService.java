package com.example.services;

import com.example.entity.Booking;
import java.time.LocalDateTime;
import java.util.List;

public interface IBookingService {
    Booking createBooking(Long userId, Long roomId, LocalDateTime checkInDate, LocalDateTime checkOutDate, int noOfGuests, String bookingStatus);
    List<Booking> getAllBookings();
    Booking getBookingById(Long bookingId);
    void deleteBooking(Long bookingId);
    Booking updateBooking(Long bookingId, LocalDateTime checkInDate, LocalDateTime checkOutDate, int noOfGuests, String bookingStatus);
    
    // Add this method to the interface
	List<Booking> getAllBookingByRoomId(long roomId);
}
