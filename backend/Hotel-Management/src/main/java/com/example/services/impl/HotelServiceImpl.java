package com.example.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.Hotel;
import com.example.entity.Location;
import com.example.repo.HotelRepository;
import com.example.repo.LocationRepository;
import com.example.services.HotelService;

import java.util.ArrayList;
import java.util.List;

@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }


    @Override
    public Hotel createHotel(Hotel hotel) {
        if (hotel == null) {
            throw new IllegalArgumentException("Hotel cannot be null");
        }

        if (hotel.getLocation() == null) {
            throw new IllegalArgumentException("Location cannot be null");
        }

        // Fetch the Location from the database
        Location location = locationRepository.findById(hotel.getLocation().getLocationId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Location ID"));

        // Set the fetched Location back to the Hotel
        hotel.setLocation(location);

        // Save the Hotel entity
        return hotelRepository.save(hotel);
    }
    
    @Override
    public List<Hotel> getHotelsByCity(String city) {
        List<Location> locations = locationRepository.findByCity(city);
        List<Hotel> hotels = new ArrayList<>();
        for (Location location : locations) {
            hotels.addAll(location.getHotels());
        }
        return hotels;
    }
    
    @Override
    public Hotel updateHotel(Long id, Hotel hotel) {
        if (hotelRepository.existsById(id)) {
            // Fetch the existing Hotel
            Hotel existingHotel = hotelRepository.findById(id).orElse(null);
            if (existingHotel != null) {
                // Update fields
                existingHotel.setName(hotel.getName());
                existingHotel.setDescription(hotel.getDescription());
                existingHotel		.setAddress(hotel.getAddress());
                existingHotel.setEmail(hotel.getEmail());
                existingHotel.setPhNo(hotel.getPhNo());
                existingHotel.setRating(hotel.getRating());
                
                // Fetch the Location from the database
                Location location = locationRepository.findById(hotel.getLocation().getLocationId()).orElse(null);
                if (location != null) {
                    existingHotel.setLocation(location);
                }
                
                return hotelRepository.save(existingHotel);
            }
        }
        return null;
    }

    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Override
    public Location getLocationById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }

    @Override
    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public Location updateLocation(Long id, Location location) {
        if (locationRepository.existsById(id)) {
            location.setLocationId(id);
            return locationRepository.save(location);
        }
        return null;
    }

    @Override
    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }

	@Override
	public Hotel findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
