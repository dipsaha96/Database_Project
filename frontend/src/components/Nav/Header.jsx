import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    
    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/home">Home</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/courses">Courses</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/students">Students</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/teachers">Teachers</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/departments">Departments</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/login">Login</Link>
                    </li>
                    <li style={liStyle}>
                        <Link style={linkStyle} to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
const headerStyle = {
    margin: '0',
    background: '#050462',
    color: '#fff', // Change text color to white for better visibility
    padding: '20px', // Increase padding for better spacing
    textAlign: 'center',
    height: '85px',
};

const navStyle = {
    display: 'flex',
    justifyContent: 'center',
};

const ulStyle = {
    display: 'flex',
    listStyleType: 'none',
    padding: '0',
};

const liStyle = {
    margin: '0 20px', // Increased margin for better spacing
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem', // Increase font size
};


export default Header;

