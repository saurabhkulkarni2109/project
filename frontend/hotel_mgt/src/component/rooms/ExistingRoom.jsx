import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'
import RoomPaginator from '../common/RoomPaginator'
import AddRoom from '../component/rooms/AddRoom';

const ExistingRoom = () => {
    console.log("ExistingRoom component is mounting");
    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        console.log("useEffect triggered");
        fetchRoom();
    }, []);
    
    useEffect(() => {
        if (rooms.length > 0) {
            setFilteredRooms(rooms);
            console.log("Rooms state updated:", rooms);
        }
    }, [rooms]);
    

    const fetchRoom = async () => {
        console.log("fetchRoom is being called"); 
        setIsLoading(true);
        try {
            const result = await getAllRooms(); // Ensure this function makes the API call
            setRooms(result); // Update state with the fetched rooms
            setIsLoading(false);
            console.log("Fetched rooms:", result); // Add this for debugging
        } catch (error) {
            setErrorMessage("Error fetching rooms");
            console.error("Error fetching rooms:", error); // Add this for debugging
        }
    };
    
    

    const handleRoomAdded = () => {
        fetchRoom(); // Refresh the room list after a new room is added
    };

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    console.log(currentRooms);

    return (
        <>
            {isLoading ? (
                <p>Loading Existing Rooms</p>
            ) : (
                <>
                    <section className='mb-5 mt-5 container'>
                        <div className="d-flex justify-content-center mb-3 mt-5">
                            <h2>Existing Rooms</h2>
                        </div>
                        <AddRoom onRoomAdded={handleRoomAdded} />
                        <div className="table-responsive">
                            <table className='table table-bordered table-hover'>
                                <thead>
                                    <tr className='text-center'>
                                        <th>ID</th>
                                        <th>Room Type</th>
                                        <th>Room Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRooms.map((room) => (
                                        <tr key={room.id} className='text-center'>
                                            <td>{room.id}</td>
                                            <td>{room.roomType}</td>
                                            <td>{room.roomPrice}</td>
                                            <td>
                                                <button>View / Edit</button>
                                                <button>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <RoomPaginator 
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingRoom;
