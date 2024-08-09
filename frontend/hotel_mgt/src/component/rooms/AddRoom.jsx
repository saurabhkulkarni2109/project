import React, { useState } from "react";
import { addRoom, getAllRooms } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import "./addRoom.css";

const AddRoom = ({ onRoomAdded }) => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imgPreview, setImgPreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "roomPrice") {
      value = !isNaN(value) ? parseInt(value, 10) : "";
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImgPreview(URL.createObjectURL(selectedImage));
  };

  const fetchRoom = async () => {
    try {
        const rooms = await getAllRooms(); // Fetch all rooms
        onRoomAdded(rooms); // Update parent component or state
        console.log("Fetched rooms:", rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
        if (success) {
            console.log("Room successfully added, fetching updated list...");
            await fetchRoom(); // Call fetchRoom after a successful room addition
            setSuccessMessage("A new room was added to the database");
            setNewRoom({ photo: null, roomType: "", roomPrice: "" });
            setImgPreview("");
            setErrorMessage("");
        } else {
            setErrorMessage("Error adding room");
        }
    } catch (error) {
        console.error("Error in handleSubmit:", error);
        setErrorMessage("Error adding room");
    }
};

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-6">
          <h2 className="mt-5 mb-2">Add a New Room</h2>
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
              <label htmlFor="roomType" className="form-label">
                Room Type
              </label>
              <div>
                <RoomTypeSelector
                  handleNewRoomInputChange={handleRoomInputChange}
                  newRoom={newRoom}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">
                Room Price
              </label>
              <input
                className="form-control"
                required
                id="roomPrice"
                name="roomPrice"
                type="number"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
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
            <div className="d-grid d-md-flex mt-2">
              <button className="btn btn-outline-primary ml-5">
                Save Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
