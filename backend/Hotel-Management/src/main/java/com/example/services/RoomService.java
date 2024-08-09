package com.example.services;

import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.sql.rowset.serial.SerialBlob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import com.example.entity.Room;
import com.example.exception.ResourseNotFoundException;
import com.example.repo.RoomRepo;

@Service
public class RoomService implements IRoomService {
    
    private final RoomRepo roomRepo;
    
    @Autowired 
    public RoomService(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) {
        // Validate input
        if (roomType == null || roomType.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room type is required");
        }
        if (roomPrice == null || roomPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room price must be positive");
        }
        
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        
        if (file != null && !file.isEmpty()) {
            try {
                byte[] photoBytes = file.getBytes();
                Blob photoBlob = new SerialBlob(photoBytes);
                room.setPhoto(photoBlob);
            } catch (Exception e) {
                // Handle exceptions related to file processing
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing file", e);
            }
        }
        
        return roomRepo.save(room);
    }

    @Override
    public List<String> getRoomTypes() {
        // Assuming you have a method to retrieve room types, replace with actual implementation
        return roomRepo.findAll().stream()
            .map(Room::getRoomType)
            .distinct()
            .collect(Collectors.toList());
    }

	@Override
	public List<Room> getAllRooms() {
		// TODO Auto-generated method stub
		return roomRepo.findAll();
	}

	@Override
	public byte[] getRoomPhotoByRoomId(long id) throws SQLException{
		// TODO Auto-generated method stub
		Optional<Room> theRoom = roomRepo.findById(id);
		if(theRoom.isEmpty()) {
			throw new ResourseNotFoundException("Sorry, Room not found");
		}
		Blob photoBlob = theRoom.get().getPhoto();
		if(photoBlob != null) {
			return photoBlob.getBytes(1, (int) photoBlob.length());
		}
		return null;
	}
}
