import React, { useEffect, useState } from 'react';
import { getAllRooms, getRoomTypes, deleteRoom } from '../utils/ApiFunctions';
import RoomPaginator from '../common/RoomPaginator';
import AddRoom from './AddRoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ExistingRoom = () => {
    console.log("ExistingRoom component is mounting");
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(""); // Room type filter
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        console.log("useEffect triggered");
        fetchRoom();
        fetchRoomTypes();
    }, []);
    
    useEffect(() => {
        if (rooms.length > 0) {
            applyFilter(); // Apply filter whenever rooms or selectedRoomType changes
            console.log("Rooms state updated:", rooms);
        }
    }, [rooms, selectedRoomType]);

    const fetchRoom = async () => {
        console.log("fetchRoom is being called"); 
        setIsLoading(true);
        try {
            const result = await getAllRooms(); // Ensure this function makes the API call
            setRooms(result); // Update state with the fetched rooms
            setIsLoading(false);
            setSuccessMessage(""); // Clear any previous success messages
            console.log("Fetched rooms:", result); // Add this for debugging
        } catch (error) {
            setErrorMessage("Error fetching rooms");
            console.error("Error fetching rooms:", error); // Add this for debugging
        }
    };

    const fetchRoomTypes = async () => {
        try {
            const types = await getRoomTypes();
            setRoomTypes(types);
        } catch (error) {
            console.error("Error fetching room types:", error);
        }
    };

    const applyFilter = () => {
        if (selectedRoomType === "" || selectedRoomType === "All") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter(room => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
    };

    const handleRoomAdded = (newRoom) => {
        setRooms((prevRooms) => [newRoom, ...prevRooms]);
        setSuccessMessage("Room added successfully!");
        setErrorMessage(""); // Clear any previous error messages
    };

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Room No ${roomId} was deleted `)
                fetchRoom()
            }
            else{
                console.error(`Error deleting room : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() =>{
             setSuccessMessage("")
             setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = () => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

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
                        <div className="mb-3">
                            <select
                                className="form-control"
                                value={selectedRoomType}
                                onChange={(e) => setSelectedRoomType(e.target.value)}
                            >
                                <option value="">Select a Room Type</option>
                                <option value="All">All</option>
                                {roomTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={() => setSelectedRoomType("")}
                            >
                                Clear Filter
                            </button>
                        </div>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
                                            <td className="gap-2">
                                                <Link to={`/edit-room/${room.id}`}>
                                                <span className="btn btn-info btn-sm">
                                                <FontAwesomeIcon icon={faEye}/> 
                                                    </span>
                                                <span className="btn btn-warning btn-sm">
                                                <FontAwesomeIcon icon={faEdit}/> 
                                                    </span>
                                                </Link>

                                                <button className='btn btn-danger btn-sm'
                                                    onClick={() => handleDelete(room.id)}>
                                                       <FontAwesomeIcon icon={faTrash}/> 
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <RoomPaginator 
                            currentPage={currentPage}
                            totalPages={calculateTotalPages()}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    );
};

export default ExistingRoom;
