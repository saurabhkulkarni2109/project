import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";


const AddRoom = () => {
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
      // Ensure `parseInt` is used correctly
      value = !isNaN(value) ? parseInt(value, 10) : "";
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImgPreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (success !== undefined) {
        setSuccessMessage("A new room was added to the database");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImgPreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room");
      }
    } catch (error) {}
  };

  return (
    <>
      <section className="container, mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6">
            <h2 className="mt-5 mb-2">Add a New Room</h2>
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
    </>
  );
};

export default AddRoom;
