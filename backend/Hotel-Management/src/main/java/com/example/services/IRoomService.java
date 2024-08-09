package com.example.services;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.entity.Room;

public interface IRoomService {

	Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice);
	List<String> getRoomTypes();
	List<Room> getAllRooms();
	byte[] getRoomPhotoByRoomId(long id);
	

}
