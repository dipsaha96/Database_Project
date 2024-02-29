import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../assets/CSS/studentInformation.css';

function StudentInformation() {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);

    useEffect(() => {
        // Fetch student information from the backend
        axios.get(`http://localhost:8000/student/${studentId}`)
            .then(response => {
                setStudent(response.data);
            })
            .catch(error => {
                console.error('Error fetching student information:', error);
            });

        // Fetch profile information from the backend
        axios.get(`http://localhost:8000/profile/${studentId}`)
            .then(response => {
                setProfileInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile information:', error);
            });
    }, [studentId]);

    return (
        <div className="student-information-container">
            <h1>Student Information</h1>
            {student && (
                <div className="student-info-box">
                    <p><strong>Student ID:</strong> {student.student_id}</p>
                    <p><strong>Full Name:</strong> {student.full_name}</p>
                    <p><strong>Age:</strong> {student.age}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>Level:</strong> {student.level}</p>
                    <p><strong>Term:</strong> {student.term}</p>
                </div>
            )}
            {profileInfo && (
                <div className="profile-info-box">
                    <h2>Profile Information</h2>
                    <p><strong>Email:</strong> {profileInfo.email}</p>
                    <p><strong>Phone Number:</strong> {profileInfo.phone}</p>
                    {/* Add more profile information fields as needed */}
                </div>
            )}
            <button className="update-button">Update Information</button>
        </div>
    );
}
 
export default StudentInformation;
