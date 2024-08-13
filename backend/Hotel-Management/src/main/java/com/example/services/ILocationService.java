package com.example.services;

import com.example.entity.Location;
import java.util.List;
import java.util.Optional;

public interface ILocationService {
    Location addNewLocation(Location location);
    List<Location> getAllLocations();
    Optional<Location> getLocationById(Long id);
    void deleteLocation(Long id);
    Location updateLocation(Long id, Location location);
}
