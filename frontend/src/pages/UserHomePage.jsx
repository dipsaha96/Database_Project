import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/userhomepage.css';

function UserHomePage() {
    return (
        <div className="left-menu">
            <div className="left-menu-header">
                <h2>User Menu</h2>
            </div>
            <ul className="left-menu-items">
                <li><Link to="/profile">Your Profile Info</Link></li>
                <li><Link to="/viewcourses">View Courses</Link></li>
                <li><Link to="/addcourses">Add Courses</Link></li>
                <li><Link to="/assignments">Assignments</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/ct">CT</Link></li>
                <li><Link to="/grades">Grades</Link></li>
                <li><Link to="/fees">Fees</Link></li>
                <li><Link to="/lectures">Lectures</Link></li>
                <li><Link to="/supervisor">Supervisor</Link></li>
            </ul>
        </div>
    );
}
export default UserHomePage;