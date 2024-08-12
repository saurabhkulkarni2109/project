import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleNewRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
  const [newRoomTypes, setNewRoomTypes] = useState("");

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        console.log('Fetching room types...');
        const data = await getRoomTypes();
        console.log('Fetched Room Types:', data);
        if (Array.isArray(data)) {
          setRoomTypes(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRoomTypes();
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomTypes(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomTypes !== "") {
      setRoomTypes([...roomTypes, newRoomTypes]);
      setShowNewRoomTypesInput(false);
      handleNewRoomInputChange({
        target: { name: "roomType", value: newRoomTypes },
      });
    }
    setNewRoomTypes("");
  };

  return (
    <>
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
          {roomTypes.length > 0 && roomTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        {showRoomTypeInput && (
          <div className="input-group mt-2">
            <input
              className="form-control"
              type="text"
              placeholder="Enter a new Room Type"
              value={newRoomTypes}
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
    </>
  );
};

export default RoomTypeSelector;
