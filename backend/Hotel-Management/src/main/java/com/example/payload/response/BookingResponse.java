package com.example.payload.response;

import java.time.LocalDate;

public class BookingResponse {
	
	private long id;
	private LocalDate checkInDate;
	private LocalDate checkOutDate;
	private String guestName;
	private String guestEmail;
	private int NumOfAdults;
	private int NumOfChildren;
	private int totalNumOfGuest;
	private String bookingConfirmationCode;
	private RoomResponse room;
	
	 
	
	public BookingResponse(long id, LocalDate checkInDate, LocalDate checkOutDate, String guestName, String guestEmail,
			int numOfAdults, int numOfChildren, int totalNumOfGuest, String bookingConfirmationCode,
			RoomResponse room) {
		this.id = id;
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


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDate getCheckInDate() {
		return checkInDate;
	}

	public void setCheckInDate(LocalDate checkInDate) {
		this.checkInDate = checkInDate;
	}

	public LocalDate getCheckOutDate() {
		return checkOutDate;
	}

	public void setCheckOutDate(LocalDate checkOutDate) {
		this.checkOutDate = checkOutDate;
	}

	public String getGuestName() {
		return guestName;
	}

	public void setGuestName(String guestName) {
		this.guestName = guestName;
	}

	public String getGuestEmail() {
		return guestEmail;
	}

	public void setGuestEmail(String guestEmail) {
		this.guestEmail = guestEmail;
	}

	public int getNumOfAdults() {
		return NumOfAdults;
	}



	public void setNumOfAdults(int numOfAdults) {
		NumOfAdults = numOfAdults;
	}



	public int getNumOfChildren() {
		return NumOfChildren;
	}



	public void setNumOfChildren(int numOfChildren) {
		NumOfChildren = numOfChildren;
	}



	public int getTotalNumOfGuest() {
		return totalNumOfGuest;
	}



	public void setTotalNumOfGuest(int totalNumOfGuest) {
		this.totalNumOfGuest = totalNumOfGuest;
	}



	public String getBookingConfirmationCode() {
		return bookingConfirmationCode;
	}



	public void setBookingConfirmationCode(String bookingConfirmationCode) {
		this.bookingConfirmationCode = bookingConfirmationCode;
	}



	public RoomResponse getRoom() {
		return room;
	}



	public void setRoom(RoomResponse room) {
		this.room = room;
	}
	
	


	

}
