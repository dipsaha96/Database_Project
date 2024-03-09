import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import necessary icons
import { StateContext } from '../../context/ContextProvider';

import '../assets/CSS/login.css';

function Login(props) {

    const selection = props.selection;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login', { email, password, selection });
            if (response.data.message === 'admin') {
                window.location.href = '/admin';
            } else if (response.data.message === 'user') {
                window.location.href = '/userhomepage';
            } else {
                setShow(true);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('Internal Server Error. Please try again later.');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="overlay">
            <form onSubmit={handleLogin}>
                <div className="con">
                    <header className="head-form">
                        <h2>Log In</h2>
                        <p>Login here using your email or user_id and password</p>
                    </header>
                    <br />
                    <div className="field-set">
                        <span className="input-item">
                            <FaUserCircle />
                        </span>
                        <input
                            className="form-input"
                            id="txt-input"
                            type="text"
                            placeholder="User_id or @EmailAddress"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br />
                        <span className="input-item">
                            <FaKey />
                        </span>
                        <input
                            className="form-input"
                            type={passwordVisible ? 'text' : 'password'} // Toggle input type based on password visibility state
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon based on password visibility state */}
                        </span>
                        <br />
                        <button className="log-in" type="submit"> Log In </button>
                    </div>
                    <div className="other">
                        <button className="btn submits frgt-pass">Forgot Password</button>
                        <button className="btn submits sign-up"><Link className='link-styles' to="/signup">Sign Up</Link></button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
