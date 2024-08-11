package com.example.services;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import com.example.entity.Room;
import org.springframework.web.multipart.MultipartFile;

public interface IRoomService {
    Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice);
    List<String> getRoomTypes();
    List<Room> getAllRooms();
    byte[] getRoomPhotoByRoomId(long id) throws SQLException;  // Update here
	void deleteRoom(Long roomId);
	Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes);
	Optional<Room> getRoomById(Long roomId);
}
