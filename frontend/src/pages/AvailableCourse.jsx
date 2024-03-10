import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/CSS/course.css';

function Course() {
    const { userId } = useParams();
    const [courses, setCourses] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, [userId]); // Fetch courses whenever userId changes

    const fetchCourses = () => {
        axios.get(`http://localhost:8000/availablecourse/${userId}`)
            .then((response) => {                
                setCourses(response.data);
            })  
            .catch((error) => {
                console.error(error);
            });
    };

    const handleAddCourse = async (courseId) => {
        try {
            const response = await axios.post(`http://localhost:8000/addstudentcourse/${userId}/${courseId}`);
            if (response.data && response.data.message) {
                setShowConfirmation(true);
                // Fetch courses again to update the list after adding a course
                fetchCourses();
            } else {
                throw new Error('Failed to add course');
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div className="course-container">
            <h1 className="course-heading">Your Available Courses</h1>
            <div className="course-table-container">
                {showConfirmation && <p>Course added successfully!</p>}
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
                                    <button className="view-button" onClick={() => handleAddCourse(course.course_id)}>
                                        Add COURSE
                                    </button>
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
