import React, { createContext, useState, useContext } from 'react';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);
    console.log("Room Context:", rooms); // Debugging log

    return (
        <RoomContext.Provider value={{ rooms, setRooms }}>
            {children}
        </RoomContext.Provider>
    );
};

export const useRooms = () => useContext(RoomContext);