import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = (handleNewRoomInputChange, newRoom) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
  const [newRoomTypes, setNewRoomTypes] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomTypes(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomTypes !== "") setRoomTypes([...roomTypes, newRoomTypes]);
    setNewRoomTypes("");
    setShowNewRoomTypesInput(false);
  };

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            id="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypesInput(true);
              } else {
                handleNewRoomInputChange(e);
              }
            }}
          >
            <option value={""}>Select a Room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showRoomTypeInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new Room Type"
                onChange={handleNewRoomTypeInputChange}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
