import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home/Home'; // Ensure this path is correct
import List from './Pages/list/List';
import Hotel from './Pages/hotels/Hotel';
import Register from './Pages/register/Register';
import Login from './Pages/login/Login';
import { AuthProvider } from './context/AuthContext';
import EditRoom from './component/rooms/EditRoom';
import ExistingRoom from './component/rooms/ExistingRoom';
import { RoomProvider } from './context/RoomContext';
import AddRoom from './component/rooms/AddRoom';
import RoomListing from './component/rooms/RoomListing';
import Admin from './component/admin/Admin';


function App() {
  return (
    <AuthProvider>
      <RoomProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit-room/:roomId" element={<EditRoom/>} />
          <Route path="/existing-rooms" element={<ExistingRoom/>} />
          <Route path="/add-room" element={<AddRoom/>} />
          <Route path="/browse-all-rooms" element={<RoomListing/>} />
          <Route path="/admin" element={<Admin/>} />

        </Routes>
      </BrowserRouter>
      </RoomProvider>
    </AuthProvider>
  );
}

export default App;
