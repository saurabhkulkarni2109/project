package com.example.payload.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingResponse {
	
	private long bookingid;
	private LocalDateTime checkInDate;
	private LocalDateTime checkOutDate;
	private String guestName;
	private String guestEmail;
	private int NumOfAdults;
	private int NumOfChildren;
	private int totalNumOfGuest;
	private String bookingConfirmationCode;
	private RoomResponse room;
	
	 
	
	public BookingResponse(long bookingid, LocalDateTime checkInDate, LocalDateTime checkOutDate, String guestName, String guestEmail,
			int numOfAdults, int numOfChildren, int totalNumOfGuest, String bookingConfirmationCode,
			RoomResponse room) {
		this.bookingid = bookingid;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;
		this.guestName = guestName;
		this.guestEmail = guestEmail;
		NumOfAdults = numOfAdults;
		NumOfChildren = numOfChildren;
		this.totalNumOfGuest = totalNumOfGuest;
		this.bookingConfirmationCode = bookingConfirmationCode;
		this.room = room;
	}


	public BookingResponse(long bookingId, LocalDateTime localDateTime, LocalDateTime localDateTime2,
			String bookingConfirmationCode) {
		this.bookingid = bookingid;
		this.checkInDate = localDateTime;
		this.checkOutDate = localDateTime2;
		this.bookingConfirmationCode = bookingConfirmationCode;
	}

}