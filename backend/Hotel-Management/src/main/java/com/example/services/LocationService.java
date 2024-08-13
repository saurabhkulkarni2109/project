package com.example.services;

import com.example.entity.Location;
import com.example.repo.LocationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService implements ILocationService {

    private final LocationRepo locationRepo;

    @Autowired
    public LocationService(LocationRepo locationRepo) {
        this.locationRepo = locationRepo;
    }

    @Override
    public Location addNewLocation(Location location) {
        return locationRepo.save(location);
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }

    @Override
    public Optional<Location> getLocationById(Long id) {
        return locationRepo.findById(id);
    }

    @Override
    public void deleteLocation(Long id) {
        if (locationRepo.existsById(id)) {
            locationRepo.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found");
        }
    }

    @Override
    public Location updateLocation(Long id, Location location) {
        if (locationRepo.existsById(id)) {
            location.setLocationId(id);
            return locationRepo.save(location);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found");
        }
    }
}
