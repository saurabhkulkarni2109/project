package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Room;

public interface RoomRepo extends JpaRepository<Room, Long> {

}
