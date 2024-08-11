import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imgPreview, setImgPreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {roomId} = useParams
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImgPreview(URL.createObjectURL(selectedImage));
  };

  const handleInputChange = (event) => {
    const { name, value} = event.target
    setRoom({...room, [name]:value })
  }

  useEffect(() =>{
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId)
        setRoom(roomData)
        setImgPreview(roomData.photo)
      } catch (error) {
        console.error(error)
      }
    }
     fetchRoom()
  },[roomId])
  const handleSubmit = async (event) => {
    event.preventDefault()

    try{
      const response = await updateRoom(roomId,room)
      if(response.status === 200){
        setSuccessMessage("Room updated successfully!")
        const updatedRoomData = await getRoomById(roomId)
        setRoom(updatedRoomData)
        setImgPreview(updatedRoomData.photo)
        setErrorMessage("")
      }else{
        setErrorMessage("Error updating room")
      }
    }catch(error){
      console.error(error)
      setErrorMessage(error.message)
    }
  }
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
              <label htmlFor="roomPrice" className="form-label">
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
}

export default EditRoom