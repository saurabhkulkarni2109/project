package com.example.services;

import com.example.entity.Hotel;
import java.util.List;
import java.util.Optional;

public interface IHotelService {
    Hotel addNewHotel(Hotel hotel);
    List<Hotel> getAllHotels();
    Optional<Hotel> getHotelById(Long id);
    void deleteHotel(Long id);
    Hotel updateHotel(Long id, Hotel hotel);
}
