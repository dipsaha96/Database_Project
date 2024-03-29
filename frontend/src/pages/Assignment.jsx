import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/course.css';

function Course() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/course")
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="course-container">
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/available-courses" className="check-courses-button">Check Your Available Courses</Link>
        </div>
    );
}

export default Course;
