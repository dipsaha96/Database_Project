import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../assets/CSS/viewgrade.css';

function CourseInformation() {
    const { userID } = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch grade information for the specified user from the backend
        axios.get(`http://localhost:8000/grades/${userID}`)
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching grades information:', error);
            });
    }, [userID]);

    return (
        <div className="course-information-container">
            <h1>View Grades</h1>
            {courses.length > 0 ? (
                courses.map(course => (
                    <div className="course" key={course.course_id}>
                        <h2>Course {course.course_id}</h2>
                        <p><strong>Course ID:</strong> {course.course_id}</p>
                        <p><strong>Course Title:</strong> {course.course_title}</p>
                        <p><strong>Assignment 1 Title:</strong> {course.assignment1_title}</p>
                        <p><strong>Assignment 1 Mark:</strong> {course.assignment1_mark}</p>
                        <p><strong>Assignment 2 Title:</strong> {course.assignment2_title}</p>
                        <p><strong>Assignment 2 Mark:</strong> {course.assignment2_mark}</p>
                        <p><strong>CT 1 Title:</strong> {course.ct1_title}</p>
                        <p><strong>CT 1 Mark:</strong> {course.ct1_mark}</p>
                        <p><strong>CT 2 Title:</strong> {course.ct2_title}</p>
                        <p><strong>CT 2 Mark:</strong> {course.ct2_mark}</p>
                        <p><strong>Term Final Mark:</strong> {course.term_final_mark}</p>
                        <p><strong>CGPA : </strong>{course.cgpa}</p>
                    </div>
                ))
            ) : (
                <p>No courses found</p>
            )}
            <div><p><strong>OVERALL CGPA: 4.00</strong></p></div>
        </div>
    );
}

export default CourseInformation;
