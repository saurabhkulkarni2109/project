// src/Components/Navbar/Navbar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "./navbar.css";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();  // Destructure auth state, user info, and logout function
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // State to manage dropdown visibility

    const handleLogout = () => {
        logout();  // Update authentication state
        navigate('/login');  // Redirect to login page
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);  // Toggle dropdown visibility
    };

    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">Website Name</span>
                <div className="navItems">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/register"><button className="navButton">Register</button></Link>
                            <Link to="/login"><button className="navButton">Login</button></Link>
                        </>
                    ) : (
                        <div className="userProfile">
                            <div className="userCircle" onClick={toggleDropdown}>
                                {/* Display user initials or profile picture here */}
                                {user && user.firstname ? user.firstname.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="userName">{user ? user.firstname : ''}</span>
                            {isDropdownOpen && (
                                <div className="dropdownMenu">
                                    <span className="dropdownItem">{user ? user.firstname : ''}</span>
                                    <button className="dropdownItem navButton " onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
