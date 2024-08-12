package com.example.services;

import java.util.List;
import com.example.entity.Hotel;
import com.example.entity.Location;

public interface HotelService {
    List<Hotel> getAllHotels();
    Hotel getHotelById(Long id);
    Hotel createHotel(Hotel hotel);
    Hotel updateHotel(Long id, Hotel hotel);
    void deleteHotel(Long id);
    List<Location> getAllLocations();
    Location getLocationById(Long id);
    Location createLocation(Location location);
    Location updateLocation(Long id, Location location);
    void deleteLocation(Long id);
    List<Hotel> getHotelsByCity(String city);
	Hotel findById(Long id);
}
