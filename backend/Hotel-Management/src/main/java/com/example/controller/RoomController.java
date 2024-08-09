package com.example.controller;

import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.BookRoom;
import com.example.entity.Room;
import com.example.exception.PhotoRetrivalExecution;
import com.example.payload.response.BookingResponse;
import com.example.payload.response.RoomResponse;
import com.example.services.BookingService;
import com.example.services.IRoomService;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "http://localhost:3000") 
public class RoomController {

    private final IRoomService roomService;
    private final BookingService bookingService;

    @Autowired
    public RoomController(IRoomService roomService,BookingService bookingService) {
        this.roomService = roomService;
		this.bookingService = new BookingService();
    }
    

    @GetMapping("/room-types")
    public ResponseEntity<List<String>> getRoomTypes() {
        List<String> roomTypes = roomService.getRoomTypes();
        return ResponseEntity.ok(roomTypes);
    }

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) {

        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();

        for (Room room : rooms) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            String base64Photo = (photoBytes != null && photoBytes.length > 0) 
                ? Base64.encodeBase64String(photoBytes) 
                : null;

            RoomResponse roomResponse = getRoomResponse(room);
            roomResponse.setPhoto(base64Photo);
            roomResponses.add(roomResponse);  // Add the roomResponse to the list
        }

        return ResponseEntity.ok(roomResponses);
    }


    
   
    private RoomResponse getRoomResponse(Room room) throws SQLException {
        List<BookRoom> bookings = getAllBookingsByRoomId(room.getId());
        List<BookingResponse> bookinginfo = new ArrayList<>();

        if (bookings != null) {
            bookinginfo = bookings.stream()
                .map(booking -> new BookingResponse(
                    booking.getBookingId(),
                    booking.getCheckInDate(),
                    booking.getCheckOutDate(),
                    booking.getBookingConfirmationCode()))
                .toList();
        }

        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrivalExecution("Error Retrieving photo");
            }
        }

        return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(), room.isBooked(), photoBytes, bookinginfo);
    }


	private List<BookRoom> getAllBookingsByRoomId(long id) {
		return bookingService.getAllBookingByRoomId(id); 
	}
}

