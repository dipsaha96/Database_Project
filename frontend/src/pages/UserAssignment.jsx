import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Add this line to import useParams
import axios from 'axios';
import '../assets/CSS/course.css';
import UserHomePage from '../pages/UserHomePage';
import { Link } from 'react-router-dom';

function Course() {
    const { userId } = useParams(); // Access route parameter userId using useParams
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/viewcourse/${userId}`)
            .then((response) => {                
                setCourses(response.data);
            })  
            .catch((error) => {
                console.error(error);
            });
    }, [userId]); // Include userId in the dependency array

    return (
        <div className="course-container">
            <UserHomePage></UserHomePage>
            <h1 className="course-heading">Your Courses</h1>
            <div className="course-table-container">
                <table className="course-table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Title</th>
                            <th>Course Belongs to</th>
                            <th>Total Lectures</th>
                            <th>Credit</th>
                            <th className="actions-column">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.course_id}</td>
                                <td>{course.course_title}</td>
                                <td>{course.course_belongs_to}</td>
                                <td>{course.total_lectures}</td>
                                <td>{course.credit}</td>
                                <td className="actions-column">
                                    <Link to={`/assignment/${course.course_id}`} className="view-link">
                                        <button className="view-button" onClick={() => handleViewInformation(course.course_id)}>View Assignments</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Course;
