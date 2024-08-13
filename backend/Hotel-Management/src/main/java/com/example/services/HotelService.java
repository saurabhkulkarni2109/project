package com.example.services;

import com.example.entity.Hotel;
import com.example.repo.HotelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService implements IHotelService {

    private final HotelRepo hotelRepo;

    @Autowired
    public HotelService(HotelRepo hotelRepo) {
        this.hotelRepo = hotelRepo;
    }

    @Override
    public Hotel addNewHotel(Hotel hotel) {
        return hotelRepo.save(hotel);
    }

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepo.findAll();
    }

    @Override
    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepo.findById(id);
    }

    @Override
    public void deleteHotel(Long id) {
        if (hotelRepo.existsById(id)) {
            hotelRepo.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found");
        }
    }

    @Override
    public Hotel updateHotel(Long id, Hotel hotel) {
        if (hotelRepo.existsById(id)) {
            hotel.setHotelId(id);
            return hotelRepo.save(hotel);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Hotel not found");
        }
    }
}
