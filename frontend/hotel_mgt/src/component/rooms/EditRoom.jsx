import React, { useEffect, useState } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRooms } from '../../context/RoomContext';


const EditRoom = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { rooms, setRooms } = useRooms();
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: "",
    });
    const [imgPreview, setImgPreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                setImgPreview(roomData.photo);
                console.log("Fetched room data:", roomData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRoom();
    }, [roomId]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setImgPreview(URL.createObjectURL(selectedImage));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          await updateRoom(roomId, room);
          // Update context with the new room data
          const updatedRooms = rooms.map(r => r.id === roomId ? { ...r, ...room } : r);
          setRooms(updatedRooms); // Update the context with the updated room
          setSuccessMessage("Room updated successfully!");
          navigate('/existing-rooms', { state: { updated: true } });
      } catch (error) {
          setErrorMessage(error.message || "Error updating room");
      }
  };

  
  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-6">
          <h2 className="mt-5 mb-2">Edit Room</h2>
          {successMessage && (
            <div className="alert alert-success fade show">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger fade show">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label hotel-color">
                Room Type
              </label>
              <input
                className="form-control"
                required
                id="roomType"
                name="roomType"
                type="text"
                value={room.roomType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                Room Price
              </label>
              <input
                className="form-control"
                required
                id="roomPrice"
                name="roomPrice"
                type="number"
                value={room.roomPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Room Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                className="form-control"
                onChange={handleImageChange}
              />
              {imgPreview && (
                <img
                  src={imgPreview}
                  alt="Preview Room Photo"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mb-3"
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
             <Link to={"/existing-rooms"} className="btn btn-outline-primary ml-5">
                Back
              </Link>
              <button type="submit" className='btn btn-outline-warning'>Edit Room</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditRoom