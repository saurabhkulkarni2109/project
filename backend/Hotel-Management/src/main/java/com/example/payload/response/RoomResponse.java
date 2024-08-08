package com.example.payload.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.Base64; // Import the standard Java Base64 class

public class RoomResponse {
    private long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked = false;
    private String photo;
    private List<BookingResponse> bookings;



    
    public RoomResponse(long id, String roomType, BigDecimal roomPrice) {
		this.id = id;
		this.roomType = roomType;
		this.roomPrice = roomPrice;
	}



	public RoomResponse(long id, String roomType, BigDecimal roomPrice, boolean isBooked, byte[] photoBytes,
                        List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
        this.bookings = bookings;
    }

   

	public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public BigDecimal getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(BigDecimal roomPrice) {
        this.roomPrice = roomPrice;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean isBooked) {
        this.isBooked = isBooked;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public List<BookingResponse> getBookings() {
        return bookings;
    }

    public void setBookings(List<BookingResponse> bookings) {
        this.bookings = bookings;
    }
}
