import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../assets/CSS/teacherinformation.css';

function TeacherInformation() {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        // Fetch teacher information from the backend
        axios.get(`http://localhost:8000/teacher/${teacherId}`)
            .then(response => {
                setTeacher(response.data);
            })
            .catch(error => {
                console.error('Error fetching teacher information:', error);
            });
    }, [teacherId]);

    return (
        <div className="teacher-information-container">
            <h1>Teacher Information</h1>
            {teacher && (
                <div className="teacher-info-box">
                    <p><strong>Teacher ID:</strong> {teacher.teacher_id}</p>
                    <p><strong>Name:</strong> {teacher.name}</p>
                    <p><strong>Phone Number:</strong> {teacher.phone_number}</p>
                    <p><strong>Email:</strong> {teacher.email}</p>
                    <p><strong>Address:</strong> {teacher.address}</p>
                    <p><strong>Department ID:</strong> {teacher.department_id}</p>
                </div>
            )}
        </div>
    );
}
 
export default TeacherInformation;
