import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!firstname || !lastname || !username || !email || !password) {
            setError("All fields are required.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Email address is invalid.");
            return false;
        }
        return true;
    };

    const save = async (event) => {
        event.preventDefault();
        setError("");
        if (!validateForm()) return;

        try {
            await axios.post("http://localhost:8080/api/v1/user/save", {
                firstname,
                lastname,
                username,
                email,
                password
            });
            alert("User Registered Successfully");
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "An error occurred during registration.");
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }

    return (
        <div className="container mt-4">
            <h1>User Registration</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
                    <div className="form-group">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="firstname" 
                            placeholder="Enter Name"
                            value={firstname}
                            onChange={(event) => setFirstname(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="lastname" 
                            placeholder="Enter Name"
                            value={lastname}
                            onChange={(event) => setLastname(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder="Enter Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-primary mt-4" 
                        onClick={save}
                    >
                        Register
                    </button>
                </form>
        </div>
    );
}

export default Register;


























