import React, { useEffect, useState } from 'react';
import { getAllRooms, getRoomTypes, deleteRoom } from '../utils/ApiFunctions';
import RoomPaginator from '../common/RoomPaginator';
import AddRoom from './AddRoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useRooms } from '../../context/RoomContext';
import { Col, Row } from 'react-bootstrap';

const ExistingRoom = () => {
    // State declarations
    const { rooms, setRooms } = useRooms();
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const location = useLocation(); // Use useLocation hook

    // Function declarations
    const fetchRoom = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);
            setSuccessMessage("");
        } catch (error) {
            setErrorMessage("Error fetching rooms");
            setIsLoading(false);
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
        setRooms(prevRooms => [newRoom, ...prevRooms]);
        setSuccessMessage("Room added successfully!");
        setErrorMessage("");
    };

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId);
            if (result === "") {
                setSuccessMessage(`Room No ${roomId} was deleted`);
                fetchRoom();
            } else {
                console.error(`Error deleting room : ${result.message}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const calculateTotalPages = () => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    };

    // useEffect hooks
    useEffect(() => {
        fetchRoom();
        fetchRoomTypes();
    }, []);

    useEffect(() => {
        if (rooms.length > 0) {
            applyFilter();
        }
    }, [rooms, selectedRoomType]);

    useEffect(() => {
        // Check for location state and refetch data if necessary
        if (location.state?.updated) {
            fetchRoom();
        }
    }, [location.state]);

    // Pagination calculations
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <>
            {isLoading ? (
                <p>Loading Existing Rooms</p>
            ) : (
                <section className='mb-5 mt-5 container'>
                   
                    <div className="d-flex justify-content-between mb-3 mt-5">
                        <h2>Existing Rooms</h2>
                    </div>
                  

                    <div className="mb-3">Filter Room By Type
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
                    <Row>
                    <Col md={6} className="d-flex justify-content-end">
                    <Link to={"/add-room"}>
                        <FontAwesomeIcon icon={faPlus} />Add Room
                        </Link>
                    </Col>    
                    </Row>
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
                                                    <FontAwesomeIcon icon={faEye} />
                                                </span>
                                                <span className="btn btn-warning btn-sm">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </span>
                                            </Link>
                                            <button className='btn btn-danger btn-sm' onClick={() => handleDelete(room.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
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
            )}
        </>
    );
};

export default ExistingRoom;
