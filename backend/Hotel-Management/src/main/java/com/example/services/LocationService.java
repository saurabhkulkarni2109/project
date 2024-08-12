package com.example.services;

import com.example.entity.Location;

import java.util.List;

public interface LocationService {
    Location createLocation(Location location);
    Location getLocationById(Long id);
    List<Location> getAllLocations();
    Location updateLocation(Long id, Location location);
    boolean deleteLocation(Long id);
}

