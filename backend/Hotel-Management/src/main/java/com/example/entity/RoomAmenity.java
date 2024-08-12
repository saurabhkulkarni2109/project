package com.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class RoomAmenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomAmenityId;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false) // Specify the column name for Room
    private Room room;

    @ManyToOne
    @JoinColumn(name = "amenity_id", nullable = false) // Specify the column name for Amenity
    private Amenity amenity;

    // Getters and Setters
    public Long getRoomAmenityId() {
        return roomAmenityId;
    }

    public void setRoomAmenityId(Long roomAmenityId) {
        this.roomAmenityId = roomAmenityId;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Amenity getAmenity() {
        return amenity;
    }

    public void setAmenity(Amenity amenity) {
        this.amenity = amenity;
    }
}
