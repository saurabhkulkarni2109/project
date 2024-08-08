import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home/Home'; // Ensure this path is correct
import List from './Pages/list/List';
import Hotel from './Pages/hotels/Hotel';
import Register from './Pages/register/Register';
import Login from './Pages/login/Login';
import { AuthProvider } from './context/AuthContext';
import Room from './Pages/room/Room';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
