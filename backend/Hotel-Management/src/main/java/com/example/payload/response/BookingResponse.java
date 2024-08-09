package com.example.payload.response;

import java.time.LocalDate;

public class BookingResponse {
	
	private long bookingid;
	private LocalDate checkInDate;
	private LocalDate checkOutDate;
	private String guestName;
	private String guestEmail;
	private int NumOfAdults;
	private int NumOfChildren;
	private int totalNumOfGuest;
	private String bookingConfirmationCode;
	private RoomResponse room;
	
	 
	
	public BookingResponse(long bookingid, LocalDate checkInDate, LocalDate checkOutDate, String guestName, String guestEmail,
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


	public BookingResponse(long bookingId, LocalDate checkInDate, LocalDate checkOutDate,
			String bookingConfirmationCode) {
		this.bookingid = bookingid;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;
		this.bookingConfirmationCode = bookingConfirmationCode;
	}


}