import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../assets/CSS/course.css';
import UserHomePage from '../pages/UserHomePage';

function Course() {
    const { userId } = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/course`)
            .then((response) => {                
                setCourses(response.data);
            })  
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    return (
        <div className="course-container">
            <Link to={`/availablecourse/${userId}`} className="view-link">
            <button>Check Your Available Courses</button>
            </Link>
            <h1 className="course-heading">ALL COURSES</h1>
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
                        {courses.length > 0 && courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.course_id}</td>
                                <td>{course.course_title}</td>
                                <td>{course.course_belongs_to}</td>
                                <td>{course.total_lectures}</td>
                                <td>{course.credit}</td>
                                <td className="actions-column">
                                    <Link to={`/courses/${course.course_id}`} className="view-link">
                                        <button className="view-button">Course Details</button>
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
