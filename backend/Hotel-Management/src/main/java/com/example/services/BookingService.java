package com.example.services;

import com.example.entity.Booking;
import com.example.entity.Room;
import com.example.entity.User;
import com.example.exception.ResourseNotFoundException;
import com.example.repo.BookingRepo;
import com.example.repo.RoomRepo;
import com.example.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService implements IBookingService {

    private final BookingRepo bookingRepo;
    private final UserRepo userRepo;
    private final RoomRepo roomRepo;

    @Autowired
    public BookingService(BookingRepo bookingRepo, UserRepo userRepo, RoomRepo roomRepo) {
        this.bookingRepo = bookingRepo;
        this.userRepo = userRepo;
        this.roomRepo = roomRepo;
    }

    @Override
    public Booking createBooking(Long userId, Long roomId, LocalDateTime checkInDate, LocalDateTime checkOutDate, int noOfGuests, String bookingStatus) {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourseNotFoundException("User not found"));
        Room room = roomRepo.findById(roomId).orElseThrow(() -> new ResourseNotFoundException("Room not found"));

        Booking booking = new Booking();
        booking.setCheckInDate(checkInDate);
        booking.setCheckOutDate(checkOutDate);
        booking.setNoOfGuests(noOfGuests);
        booking.setBookingStatus(bookingStatus);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        booking.setUser(user);
        booking.setRoom(room);

        return bookingRepo.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @Override
    public Booking getBookingById(Long bookingId) {
        return bookingRepo.findById(bookingId).orElseThrow(() -> new ResourseNotFoundException("Booking not found"));
    }

    @Override
    public void deleteBooking(Long bookingId) {
        if (!bookingRepo.existsById(bookingId)) {
            throw new ResourseNotFoundException("Booking not found");
        }
        bookingRepo.deleteById(bookingId);
    }

    @Override
    public Booking updateBooking(Long bookingId, LocalDateTime checkInDate, LocalDateTime checkOutDate, int noOfGuests, String bookingStatus) {
        Booking booking = bookingRepo.findById(bookingId).orElseThrow(() -> new ResourseNotFoundException("Booking not found"));
        if (checkInDate != null) booking.setCheckInDate(checkInDate);
        if (checkOutDate != null) booking.setCheckOutDate(checkOutDate);
        if (noOfGuests > 0) booking.setNoOfGuests(noOfGuests);
        if (bookingStatus != null) booking.setBookingStatus(bookingStatus);
        booking.setUpdatedAt(LocalDateTime.now());

        return bookingRepo.save(booking);
    }

    @Override
	public List<Booking> getAllBookingByRoomId(long roomId) {
		// TODO Auto-generated method stub
		return bookingRepo.findByRoomId(roomId);
	}
}
