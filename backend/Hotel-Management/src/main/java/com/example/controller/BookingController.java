package com.example.controller;

import com.example.dto.BookingRequest;
import com.example.entity.Booking;
import com.example.services.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final IBookingService bookingService;

    @Autowired
    public BookingController(IBookingService bookingService) {
        this.bookingService = bookingService;
    }
    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(
            @RequestParam Long userId,
            @RequestParam Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime checkOutDate,
            @RequestParam int numberOfGuests,
            @RequestParam String specialRequests
    ) {
        // Create a Booking object or DTO
        Booking booking = new Booking();
        booking.setUserI(userId);
        booking.setRoomId(roomId);
        booking.setCheckInDate(checkInDate);
        booking.setCheckOutDate(checkOutDate);
        booking.setNumberOfGuests(numberOfGuests);
        booking.setSpecialRequests(specialRequests);

        // Use a service to save the booking or process it
        Booking savedBooking = bookingService.saveBooking(booking);

        // Return the saved booking with HTTP status 201 Created
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId) {
        Booking booking = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/delete/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{bookingId}")
    public ResponseEntity<Booking> updateBooking(
            @PathVariable Long bookingId,
            @RequestParam(required = false) LocalDateTime checkInDate,
            @RequestParam(required = false) LocalDateTime checkOutDate,
            @RequestParam(required = false) Integer noOfGuests,
            @RequestParam(required = false) String bookingStatus) {
        Booking updatedBooking = bookingService.updateBooking(bookingId, checkInDate, checkOutDate, noOfGuests != null ? noOfGuests : 0, bookingStatus);
        return ResponseEntity.ok(updatedBooking);
    }
}
